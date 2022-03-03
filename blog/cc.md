# call with current continuation context
## Continuation Context
When a function calls another function, it waits for a return value to do something with.
For example, in 
```scheme 
(+ 1 f(x))
```
where we assume f(x) returns a value "retVal"
```scheme
(+ 1  retVal)
```
is the continuation context if we are in f(x), it is what is going to handle the return value from x

## Call/CC
call/cc takes a lambda expression with a single argument, and passes the current continuation context in as the argument. 
```Scheme
(+ 1 (call/cc 
	   (lambda (cont)
		 (display cont)
		   (cont 5))))
```
This code is fairly simple, but we can see the current continuation $( + \ \ 1 \ \ \_ )$ gets passed to the lambda expression. This continuation is itself a lambda expression, if we call it with an argument it will take that argument as the argument to the continuation. This is almost like returning from a function. We can pass a value straight to the function's continuation context instead of waiting for the function to exit normally.

## Application with Multiplying Elements of a List
First define a function multListNoCC which takes a list of numbers and multiplies them together.
```Scheme
(define multListNoCC 
  (lambda (lat)
     (cond
        ((null? lat) 1)
        (#t (* (car lat) (multListNoCC (cdr lat)))))))
```
If any element in the list is a zero, we know the final product must be zero. Therefore we can stop multiplying the elements and just return zero as the product, this is more efficient than continuing to traverse the list. However, if we just return zero, it will just get passed back up the recursive stack. We need to "pop out" of all the recursive calls and return a 0 to the original caller. This is where call/cc comes in.
```Scheme
(define multList 
  (lambda (lat)
    (call/cc (lambda (cont)
      (letrec ((helper (lambda (x)
        (cond
          ((null? x) 1)
          ((eq? (car x) 0) (cont 0))
          (#t (* (car x) (helper (cdr x))))))))
        (helper lat))))))
```
In multList, helper is almost exactly the same as multListNoCC, just with one more condition. We wrap helper in a few lambdas that let it have access to the original CC that the function was called from. 

We can then add another condition
```Scheme
((eq? (car x) 0) (cont 0))
```
which passes 0 to the original continuation context if a 0 is encountered in the list. cont is the CC before the recursion started - the original caller, so passing a value to cont effectively stops the recursion and returns a value straight back.

If a zero is never encountered the function will return normally by passing values all the way back up the recursive stack.

## More examples
```scheme
(define isNumInList
  (lambda (lat num)
    (call/cc (lambda (cont)
      (letrec ((helper (lambda (l n)
        (cond
          ((null? l) #f)
          ((eq? (car l) n) (cont #t))
          (#t (helper (cdr l) n ))))))
        (helper lat num))))))
```
If we have found an instance of the number, there is no need to continue traversal.
If we get all the way down to the end of the list and haven't found the element, pass an \#f all the way back up

```scheme
(define findFirstNumInList
  (lambda (lat num)
        (call/cc (lambda (cont)
          (letrec ((helper (lambda (l n index)
            (cond
              ((null? l) #f)
              ((eq? (car l) n) (cont index))
              (#t (helper (cdr l) n (+ index 1)))))))
            (helper lat num 0))))))
```
Much like isNumInList but returns the index of the found element