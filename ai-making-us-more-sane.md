# AI's making things _more_ sane?!

I never thought I'd say this, but AI is genuinely making some parts of software engineering _more_ sane than they were before. Yes, it's making plenty of things completely bonkers, but I don't need to tell you that. I keep noticing this phenomena where people say "Now becuase of AI we should start doing X" where X was the thing we should have been doing all along! With that, here's a list of some instances of this I've observed:

## Tests are a major part of your job now
If they weren't before, they probably should have been then too!

## Easy-to-spin-up development environments are crucial
Have you ever talked to a Nix user? I assure you, they were excited about it long before the AI boom.

## You must have fast builds
Humans like these too.

## You don't need so many dependencies anymore, just vibe them
Every dependency has a cost and that cost is much higher than most engineers realize. A modern-day Sisyphus might be tasked with keeping his dependencies up to date rather than pushing a boulder. Vendoring (copying third party code into source control) is a great solution to the infinite slog of dependency management. _Supply chain attacks?_ Nope! _Maintainer won't accept your patch?_ You are the maintainer! _Can't build when your package manager is down?_ What's a package manager? _You only use 5% of the package?_ Delete the rest!

While I was working on the backend for [Software Should Work](https://softwareshould.work) I needed to validate some Stripe webhooks. I thought to myself "hmm, I sure don't want to get this wrong, maybe I should find an SDK". So I looked at [async-stripe](https://github.com/arlyon/async-stripe), which seems like a perfectly good library, but by nature is large. Instead, I copied the webhook validation logic out of async-stripe and after paring it down was left with 50 lines of straightforward Rust code with no dependency. Much better!  

If there isn't a good dependency to copy, often times it's not at all difficult to build one yourself. We just like thinking things are too hard. Building something yourself feels a lot less intimidating when you have AI to help, but I assure you, you could have done it without AI!

## A small number of engineers can build a shocking amount
[Every achievement has a denominator](https://charity.wtf/2022/10/03/every-achievement-has-a-denominator/), and there are lots of pre-AI examples of astonishing achievements with very small denominators. Three people built SQLite, the database [deployed a trillion times](https://sqlite.org/mostdeployed.html). Daniel Stenberg has been the driving force behind cURL for 25+ years. Even among projects with many active (paid!) contributors, often a small group write most of the code. This has always been possible, even before AI.

## Your processes are getting in the way of your engineers

## w
Now that code is cheap, maybe it's better to write more code so that it's easier to understand our systems.

Code has always been cheap. I 

## Static types are great
Agents have an easier time understanding a codebase with static types. So do humans!

## You can just use AWS directly
Instead of paying a premium for a boutique cloud provider built on top of AWS, you can have Claude generate the Terraform for you and use AWS directly instead. Yes, the AWS developer experience is rough, but it was never that difficult to use it, even before Claude.
