I am very happy to share that [Roc](https://roc-lang.org) is now available on [Exercism](https://exercism.org/tracks/roc)! Exercism is a delightful platform for learning programming and especially new and exotic languages. Right now there are tracks for 74(!) languages including all the languages you've heard of like Python, Java, and Go, plenty you wouldn't expect like COBOL, SQLite, and JQ, and many more that you likely haven't heard of like Ballerina, Pyret, and Wren. After completing an exercise in the web editor or locally using the CLI, you can publish your solution, browse other users' solutions for ideas, and even request free mentoring on your work.

To celebrate Roc launching on Exercism, I'm going to walk through my solution to the [Forth exercise](https://exercism.org/tracks/roc/exercises/forth) and highlight one of my favorite Roc features: error handling.

---

[Forth](<https://en.wikipedia.org/wiki/Forth_(programming_language)>) is a stack based programming language where the entire state of the program is stored in a single stack data structure. In a stack based language, a program is a list of operations that each modify the stack in some way: pushing new values, reordering the stack, etc. For example, the program `3 dup *` computes the square of 3 by duplicating 3 and multiplying the top two numbers. With the state of the stack on the left and the remaining operations in the program on the right, the execution looks like this:

```
| 3 dup *
3 | dup *
3 3 | *
9 |
```

We can also define new compound operations. Here we've defined a new operation called `square` that is equivalent to `dup *`.

```
: square dup * ;
3 square -- Evaluates to 9
```

Our subset of Forth will support integers, simple arithmetic (`+`, `-`, `*`, `/`), and four stack operations:

- `DUP` - duplicate the top element
- `DROP` - remove the top element
- `SWAP` - swap the top two elements
- `OVER` - copy the second from top element to the top

### Solution

#### Parsing

First up, we need to parse our input. Our goal is to transform the input from a string into a simple list of operations that our interpreter understands.

```roc
parse : Str -> Result (List Op) [UnableToParseDef Str, UnknownName Str]
parse = \str ->
    lowercase = toLower str
    when Str.split (Str.trim lowercase) "\n" is
        [.. as defLines, program] ->
            defs = parseDefs? defLines

            Str.split program " "
            |> flattenDefs defs
            |> List.mapTry toOp

        [] -> Ok [] # We'll let the empty program return the empty stack
```

Here we split the input into the first zero or more lines of definitions and a final line of operations to perform. We then take the lines containing definitions and pass them into `parseDefs` to convert them into a dictionary mapping the name of each definition to the list of operations it represents. We'll then feed the dictionary of definitions and the body of the program into `flattenDefs` to produce a program containing only builtin operations which we then convert into a tag union representing the different kinds of operations.

Here's where error handling comes in: we can read `parse` from top to bottom with our focus only on the happy path, with confidence that the error states are all still being tracked. Many languages make it easy to write the happy path without worrying about errors at the cost of obscuring what kinds of errors are possible and where they can come from. Some languages make error handling very explicit at the expense of the code becoming more difficult to read and write. Roc aims to have the best of both worlds by offering easy yet robust error handling.

An important part of easy error handling is being able to say "I can't handle this error here, if it happens let someone else take care of it for me." Roc accomplishes this with the `?` operator. When applied to a function that returns a result type, it will short circuit if an error is returned and otherwise continue execution normally with the success value. This prevents us from needing to handle errors immediately, decreases indentation, and keeps happy paths clean.

#### Interpreting

Now that we've parsed our input, we can start evaluating the program. To do this, we'll define a function called `step` that takes the stack and an operation and produces a new stack. We can apply this function for each operation to produce the final state of the stack.

```roc
step : Stack, Op -> Result Stack [Arity U8, DivByZero]
step = \stack, op ->
    when op is
        Number x ->
            List.append stack x |> Ok

        Dup ->
            when stack is
                [.., x] ->
                    List.append stack x |> Ok

                _ -> Err (Arity 1)

        Divide ->
	        when stack is
                [.., _, 0] ->
                    Err DivByZero

                [.. as rest, x, y] ->
                    List.append rest (x // y) |> Ok

                _ -> Err (Arity 2)
        # etc
```

First we match against the type of operation to determine which stack transformation to apply. Then, within each operation, pattern matching on lists allows us to assert that the input is the right shape while simultaneously bringing the relevant data into scope. In the `Divide` branch we check if the top of stack is zero to return a division-by-zero error, followed by the valid case when the stack contains two values, followed by another error case where the stack has less than two arguments.

Our `step` function returns a result with a tag union as the error type.

```roc
step : Stack, Op -> Result Stack [Arity U8, DivByZero]
```

This tag union tracks all possible errors that could be returned from this function: either a function was called with the wrong number of arguments or division by zero was attempted. When we call `step` we don't have to worry about avoiding any kind of silent unchecked errors like null pointer dereferences because they just aren't possible. Knowing exactly what errors are possible and being explicit about where they occur lowers the cognitive load and frees us from having to program defensively.

#### User Output

Throughout the code we let a variety of errors bubble up to the top using the `?` operator. We can now collect all of these errors at the entry point and turn them into helpful error messages for the user. If any error is returned while parsing or evaluating the program, it will be captured in `result`.

```roc
evaluate : Str -> Result Stack Str
evaluate = \program ->
    result =
        operations = parse? program
        interpret operations

    Result.mapErr result handleError
```

If there is an error, we'll convert it to a string with `handleError`.

```roc
handleError : _ -> Str
handleError = \err ->
    when err is
        UnknownName key -> "Hmm, I don't know any operations called '$(key)'. Maybe there's a typo?"
        UnableToParseDef line ->
            """
            This is supposed to be a definition, but I'm not sure how to parse it:
            $(line)
            """

        EvaluationError { error, stack, op, ops } ->
            when error is
                Arity 1 ->
                    """
                    Oops! '$(opToStr op)' expected 1 argument, but the stack was empty.
                    $(showExecution stack ops)
                    """

                Arity n ->
                    """
                    Oops! '$(opToStr op)' expected $(Num.toStr n) arguments, but there weren't enough on the stack.
                    $(showExecution stack ops)
                    """

                DivByZero ->
                    """
                    Sorry, division by zero is not allowed.
                    $(showExecution stack ops)
                    """
```

Here we pattern match on the error union and use the context bundled with each tag to generate an error message. We didn't have to think about the specifics of how we would render errors for our users when we created each tag, but now that we are ready to, we have everything we need. The compiler will verify that our pattern matching is exhaustive which gives us peace of mind that we are handling every possible error.

These are some of the error messages produced.

```
# Input program: : foo dup dup

This is supposed to be a definition, but I'm not sure how to parse it:
: foo dup dup
```

```
# Input program: 12 34 drop swap

Oops! 'swap' expected 2 arguments, but there weren't enough on the stack.
12 | swap
```

#### Tag Unions in Roc

Any sort of tag unions are useful for error handling, but Roc's have an additional edge because they are structural. With structural tag unions we don't have to declare a type externally and reference it by name. Instead, the type of a tag union is determined by the tags used in it like in `color`.

```roc
color : Bool -> [Red, Blue]
color = \condition ->
	if condition then Red else Blue
```

If I add an operation to the interpreter that can encounter a new kind of error, all I have to do is return a new tag from `step` like `TypeMismatch` or `InputMustBePositive`. The new error tag will then immediately be reflected in the return type of the function.

Additionally, because Roc has complete type inference, the compile will track everything for us regardless of where we choose to include type annotations. You might have noticed that I omitted the input type to `handleError` with an underscore.

```
handleError : _ -> Str
```

This saves us from having to write out the whole error union and keep it updated. Similarly, I like to omit the result error type in many functions so that when I make a modification like renaming a tag or updating its payload I don't have to update any annotations.

```
step : Stack, Op -> Result Stack _
```

Roc's combination of deferred errors with `?`, structural unions, and type inference makes it incredibly easy to fall into the rich error handling [pit of success](https://blog.codinghorror.com/falling-into-the-pit-of-success/). Why wouldn't I prioritize helpful errors in my program when it's so effortless? This error handling story truly makes it a joy to use the Roc ecosystem.

#### What next?

If you'd like to give Roc a try, I recommend starting with the [tutorial](https://www.roc-lang.org/tutorial). Of course, The Roc [Exercism track](https://exercism.org/tracks/roc) is a delightful way to practice the language, and the [Roc Zulip Chat](https://roc.zulipchat.com/) is a great place to ask questions and contribute to the ecosystem. If you have questions about this post feel free to ping me on Zulip. I wrote an interpreter for a larger stack based language in Roc called [Gob](https://github.com/isaacvando/gob) with more datatypes, operations, control flow, and quotations after I was inspired by Douglas Creager's excellent Strange Loop talk  *[Concatenative programming and stack-based languages](https://youtu.be/umSuLpjFUf8?si=SV1c_Zwc5F4-cPJS)*. Finally, a massive shoutout is in order for [Aurélien Geron](https://github.com/ageron) who started the [Exercism track](https://github.com/exercism/roc), has done a huge amount of work to build it out, and has been a joy to collaborate with.

```roc
module [evaluate]
# Types
Defs : Dict Str (List Str)
Stack : List I16
Op : [Dup, Drop, Swap, Over, Add, Subtract, Multiply, Divide, Number I16]
# Evaluation
evaluate : Str -> Result Stack Str
evaluate = \program ->
    result =
        operations = parse? program
        interpret operations
    Result.mapErr result handleError
interpret : List Op -> Result Stack _
interpret = \program ->
    help = \ops, stack ->
        when ops is
            [] -> Ok stack
            [op, .. as rest] ->
                when step stack op is
                    Ok newStack -> help rest newStack
                    Err error -> EvaluationError { error, stack, op, ops } |> Err
    help program []
step : Stack, Op -> Result Stack _
step = \stack, op ->
    when op is
        Number x ->
            List.append stack x |> Ok
        Dup ->
            when stack is
                [.., x] ->
                    List.append stack x |> Ok
                _ -> Err (Arity 1)
        Drop ->
            when stack is
                [.. as rest, _] -> Ok rest
                _ -> Err (Arity 1)
        Swap ->
            when stack is
                [.. as rest, x, y] ->
                    List.append rest y
                    |> List.append x
                    |> Ok
                _ -> Err (Arity 2)
        Over ->
            when stack is
                [.. as rest, x, y] ->
                    List.concat rest [x, y, x] |> Ok
                _ -> Err (Arity 2)
        Add ->
            when stack is
                [.. as rest, x, y] ->
                    List.append rest (x + y) |> Ok
                _ -> Err (Arity 2)
        Subtract ->
            when stack is
                [.. as rest, x, y] ->
                    List.append rest (x - y) |> Ok
                _ -> Err (Arity 2)
        Multiply ->
            when stack is
                [.. as rest, x, y] ->
                    List.append rest (x * y) |> Ok
                _ -> Err (Arity 2)
        Divide ->
            when stack is
                [.., _, 0] ->
                    Err DivByZero
                [.. as rest, x, y] ->
                    List.append rest (x // y) |> Ok
                _ -> Err (Arity 2)
# Parsing
parse : Str -> Result (List Op) _
parse = \str ->
    lowercase = toLower str
    when Str.split (Str.trim lowercase) "\n" is
        [.. as defLines, program] ->
            defs = parseDefs? defLines
            Str.split program " "
            |> flattenDefs defs
            |> List.mapTry toOp
        [] -> Ok [] # We'll let the empty program return the empty stack
parseDefs : List Str -> Result Defs _
parseDefs = \lines ->
    List.walkTry lines (Dict.empty {}) \defs, line ->
        when Str.split line " " is
            [":", name, .. as tokens, ";"] ->
                ops = parseDef? tokens defs
                Dict.insert defs name ops |> Ok
            _ -> Err (UnableToParseDef line)
parseDef : List Str, Defs -> Result (List Str) _
parseDef = \tokens, defs ->
    List.walkTry tokens [] \ops, token ->
        when Dict.get defs token is
            Ok body -> List.concat ops body |> Ok
            _ if toOp token |> Result.isOk -> List.append ops token |> Ok
            _ -> Err (UnknownName token)
flattenDefs : List Str, Defs -> List Str
flattenDefs = \tokens, defs ->
    List.joinMap tokens \token ->
        when Dict.get defs token is
            Ok body -> body
            _ -> [token]
toOp : Str -> Result Op _
toOp = \str ->
    when str is
        "dup" -> Ok Dup
        "drop" -> Ok Drop
        "swap" -> Ok Swap
        "over" -> Ok Over
        "+" -> Ok Add
        "-" -> Ok Subtract
        "*" -> Ok Multiply
        "/" -> Ok Divide
        _ ->
            when Str.toI16 str is
                Ok num -> Ok (Number num)
                Err _ -> Err (UnknownName str)
# Display
handleError : _ -> Str
handleError = \err ->
    when err is
        UnknownName key -> "Hmm, I don't know any operations called '$(key)'. Maybe there's a typo?"
        UnableToParseDef line ->
            """
            This is supposed to be a definition, but I'm not sure how to parse it:
            $(line)
            """
        EvaluationError { error, stack, op, ops } ->
            when error is
                Arity 1 ->
                    """
                    Oops! '$(opToStr op)' expected 1 argument, but the stack was empty.
                    $(showExecution stack ops)
                    """
                Arity n ->
                    """
                    Oops! '$(opToStr op)' expected $(Num.toStr n) arguments, but there weren't enough on the stack.
                    $(showExecution stack ops)
                    """
                DivByZero ->
                    """
                    Sorry, division by zero is not allowed.
                    $(showExecution stack ops)
                    """
showExecution : Stack, List Op -> Str
showExecution = \stack, ops ->
    stackStr =
        List.map stack Num.toStr
        |> Str.joinWith " "
    opsStr =
        List.map ops opToStr
        |> Str.joinWith " "
    "$(stackStr) | $(opsStr)"
opToStr : Op -> Str
opToStr = \op ->
    when op is
        Dup -> "dup"
        Drop -> "drop"
        Swap -> "swap"
        Over -> "over"
        Add -> "+"
        Subtract -> "-"
        Multiply -> "*"
        Divide -> "/"
        Number num -> Num.toStr num
toLower : Str -> Str
toLower = \str ->
    result =
        Str.toUtf8 str
        |> List.map \byte ->
            if 'A' <= byte && byte <= 'Z' then
                byte - 'A' + 'a'
            else
                byte
        |> Str.fromUtf8
    when result is
        Ok s -> s
        _ -> crash "There was an unexpected error converting back to Str"
```

---

[home](/)
