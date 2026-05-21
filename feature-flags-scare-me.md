# Feature Flags Scare Me

Fear Uncertainty & Doubt is all the rage these days so I thought I'd try my hand at it. Feature flags scare me, and they should scare you too. They promise safety and speed but all too often end up delivering complexity and wasted effort instead.

I have feature flags services like [LaunchDarkly](https://launchdarkly.com/) in mind here. They allow you to add flags to your code that can be controlled remotely from their console to change the behavior of your program at runtime. This is usually used to toggle wrapped features for certain groups of users, but really is just a convenient way to inject remote state into your program.

```
if (featureFlags.myNewFeature()) {
  // new logic
} else {
  // old logic
}
```

Safety is a core benefit promised by feature flag proponents. You, a working software engineer, have surely deployed a change to production only for your users to immediately find a bug. Now you have to whip up a fix and impatiently wait for your release pipeline to finish before fixing the issue for your users. If you had wrapped the change in the feature flag, you could have simply turned off the bugged feature and stopped user-impact while you wait for the fix to reach production.

This is legitimately great when it works. But it doesn't always work, and even when it does, there's still a cost.

## Risk

Every time you deploy you take a risk. Developing an intuition for how much risk you're taking with a deploy is a very valuable skill for engineers. When your hackles raise at the thought of deploying the change you just made, you know it's time to spend extra effort making sure it's correct. When I make a stomach-turning change to a complex system, a feature flag can usually do very little to make me feel better about it.

So, why doesn't including a feature flag make me feel better?

## "Decouple deployment from release"

You might have heard about how feature flags allow for decoupling deployment from release. The idea here is that you can freely deploy your software when changes are gated by feature flags and then later come along and release those changes to your users by turning on a feature flag. This is a useful approach but I think viewing it as if deployment and release are decoupled is unhelpful. In reality, every time you deploy your software you _are_ releasing a new version of that software to your users whether or not a feature flag is present. If you add a feature flag, ideally the user doesn't notice that you've released a new version because the behavior is unchanged from their perspective, but they're still using a different piece of software than before!

The fundamental risk of doing a deployment still remains. Even with feature flags, you still handed your user a new piece of software containing new logic that you hope is bug-free.

## Feature flags are hard

Correctly implementing a feature flag is not always easy. In fact it is very easy to introduce bugs while modifying code to introduce a feature flag; I've seen this happen many times and done it myself too. "Adding a feature flag" is really code for implementing a new feature that allows the behavior of your program to be modified at run time. Every new feature added is a new opportunity to introduce bugs, and the act of adding a feature flag is no exception. Often, the nature of the change to be wrapped requires conditionals checking the flag to be scattered throughout your system. Forget to update a spot? Bug!

This really starts getting scary when it comes to understanding. The main reason risky changes are risky is because of a lack of understanding. When you change a core assumption in a complex system, no matter how much time you spend understanding it and thinking about your change, there's always the possiblity that you missed an important assumption and are silently breaking things behind the scenes. Doing the work of understanding a system is one of the hardest and most valuable things a software engineer can do.

Feature flags just pour gasoline on the lack-of-understanding fire. Now when working out your understanding of how things actually work, you also have to take into account a bunch of bonus-booleans that can change at any moment without warning.

This can really become a challenge when it comes to thinking about compatability. When you make a change without a feature flag, the process is very linear. Suppose you want to start tracking when a user logs in. First add a database column called `last_logged_in_at`, then update your application to write to that column when the user logs in. Great! Now suppose we feature flagged that change instead. You add the column as before, but now a product manager can flip the flag at any time and stop the values from being written into the column. You've now lost a guarantee about how your system works. Does `last_logged_in_at` contain the time a user last logged in? Who knows! Because of this lost guarantee, your system is now more difficult to reason about. If you want to build some other feature that depends on `last_logged_in_at` it will now have to take into account the fact that the application might stop writing values into that column at any point.

Once I added a flag around a new feature that allowed some data to be written in a new format. After (what I thought was) thorough testing, I deployed the flagged change to production. I enabled the flag and users started writing data. For some non-critical reason we decided to disable the flag and users started using the old write path again. The presence of a particular kind data written with the new path activated a codepath in the old implementation that allowed a new, unexpected kind of data to be written by the old code. Later when we reenabled the new flag, the new feature broke for some users because of the unexpected data written by the codepath in the old feature that was activated by the data written by the new path.

Of course this bug was my fault; I could have thought harder about the change and tested more to uncover this possibility. That being said, if I hadn't used a feature flag here, it's vastly less likely that this bug would have happened. I would have implemented the new feature and completely removed the old feature in a single PR. I wouldn't have needed to reason about the ways the behavior might shift out from underneath me.

## Too much code

To make matters worse, feature flags are instant tech-debt. Removing a flag is a pure clean-up task without a direct value-add like creating a new feature. Tasks like these tend to languish at the bottom of the backlog for far too long. This delay extends the time window where the codebase must support the complexity of the new and old implementations and where a changed flag value can cause a bug. Even if the flag is cleaned up quickly, it's still a task that an engineer must spend time on.

## Defaults/Dependencies

What happens when LaunchDarkly goes down? Now your system has to fallback

Why I don't like feature flags
- Too much code to clean up
- Introduces extra state into your program
- Managing extra state can become surprisingly difficult, especially when you have multiple flags interacting at once
- Every time you deploy you take a risk. Developing an intuition for how much risk you're taking with any given deploy is a very valuable skill for engineers to have. When your stomach gets knotted thinking about deploying the change you just made, you know it's time to spend extra effort making sure the change is correct. When I make a stomach-turning kind of change to a complex system, a feature flag can usually do very little to make me feel better about it.

- You can't _actually_ decouple release and deploy; you just release a new version of your software that has more configuration than it otherwise would.
-
