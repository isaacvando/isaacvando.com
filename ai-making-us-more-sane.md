# AI's making things _more_ sane?!

I never thought I'd say this, but AI is genuinely making some parts of software engineering _more_ sane. Yes, it's turning plenty of things completely bonkers, but I don't need to tell you that: you've already heard plenty of hype and waded through plenty of slop. I keep noticing this phenomena where people say "Now that AI's here we should start doing X" where X was the thing we should have been doing all along. With that, here's a list of some instances of this phenomenon I've observed:

## Tests are a central part of your job now
If they weren't before AI, they probably should have been!

## You don't need so many dependencies anymore, just vibe them
Every dependency has a cost and that cost is much higher than most engineers realize. A modern-day Sisyphus might be tasked with keeping his dependencies up to date rather than pushing a boulder. Vendoring (copying third party code into source control) is a great solution to the infinite slog of dependency management. _Supply chain attacks?_ Nope! _Maintainer won't accept your patch?_ You are the maintainer! _Can't build when your package manager is down?_ What's a package manager? _You only use 5% of the package?_ Delete the rest!

While I was working on the backend for [Software Should Work](https://softwareshould.work) I needed to validate some Stripe webhooks. I thought to myself "hmm, I sure don't want to get this wrong, maybe I should find an SDK". So I looked at [async-stripe](https://github.com/arlyon/async-stripe), which seems like a perfectly good library, but by nature is large. Instead, I copied the webhook validation logic out of async-stripe and after paring it down was left with 50 lines of straightforward Rust code and no dependency. Much better!  

If there isn't a good dependency to copy, often times it's not at all difficult to build one yourself. We just like thinking things are too hard. Building something yourself feels a lot less intimidating when you have AI to help, but I assure you, you could have done it without AI!

## Easy-to-spin-up development environments are crucial
Have you ever talked to a Nix user? I assure you, they were excited about it long before the AI boom.

## A small number of engineers can build a shocking amount
[Every achievement has a denominator](https://charity.wtf/2022/10/03/every-achievement-has-a-denominator/), and there are lots of pre-AI examples of astonishing achievements with very small denominators. Three people built SQLite, the database [deployed a trillion times](https://sqlite.org/mostdeployed.html). Daniel Stenberg has been the driving force behind cURL for 25+ years. Even among projects with many active (paid!) contributors, often a small group is responsible for most of the value. This has always been possible, even before AI.

## You must have fast builds
Humans like these too.

## Your release process is holding up your engineers
I'm willing to bet that at least 90% of engineering teams could deliver more value, more quickly, with a lighter release process. This was true before AI and will continue to be true; nothing revolutionary here. 

## Explicitness is a must
Instead of writing a macro or using framework magic, writing 20% more code in favor of explicitness pays huge dividends. Agents love this: they can look at the code and understand it without any fuss or special tooling. Of course humans love this too. The magic of explicitness is one of the core reasons engineers love [Elm](https://elm-lang.org/) (and [Roc](https://roc-lang.org)!) so much. 

## Static types are great
Agents have an easier time understanding and modifying a codebase with static types. So do humans!

## You can use AWS directly
Instead of paying a premium for a boutique cloud provider built on top of AWS, you can ask Claude to generate some Terraform for you and use AWS directly instead. Even if you didn't have Claude, I'm sure you could have figured it out yourself too!

## In sum
The parameters plugged into most engineering teams' cost-benefit analyses have been wrong all along. We used to believe that code was expensive and developers were incapable; now we believe that code is cheap and developers are capable. In reality, the latter was always true. Apparently we needed a god-in-a-box to come along to start believing it.
