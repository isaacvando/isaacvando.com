# Drinking the VPS Kool-Aid

I drank the Kool-Aid. I'm sorry to say it, but I'm a VPS shill now.

I decided to build the ticketing system (and website) for [Software Should Work](https://softwareshould.work) myself. There are some excellent off-the-shelf options like [Tito](https://ti.to) or [Luma](https://luma.com) that you probably _should_ just use. But I had good reasons to build it myself instead:
- Save on some fees
- Avoid a dependency
- Most importantly: it would be fun!
Given this bulletproof cost-benefit analysis, I set out to build instead of buy. 

## A server
Step one was to find a server. After some comparing, a $5 VPS from Hetzner in Virginia seemed like the best option. After passing through a surprisingly involved identity verification process and entering my credit card into a very clearly German checkout form, I was off to the races. I've heard lots of good things about Hetzner and have not been disappointed in the least. The service, pricing, and console have all been great.

## An application
I built the app server in Rust using Axum. Again, it's been a great experience: statically linked executables, excellent performance, good tooling, a rich type system, etc. There's more to say about how the ticketing system itself works, but I'll write another post about that.

## A database
I opted for SQLite and have been very pleased overall. It certainly has some oddities, like primary keys allowing `null`s by default, foreign key checks being opt-in on a per-connection basis, and having a very loose type-system, but it's hard to beat the performance and operational simplicity of file-as-DB. 

I couldn't risk losing ticket information, so naturally I needed backups. For this I chose [Litestream](https://litestream.io), a tool that streams changes to object storage and supports super simple point-in-time recovery: `litestream restore ssw.db`. It's wonderful to have such frequently recorded, easy to use backups for barely any cost.

I chose [Backblaze B2](https://www.backblaze.com/cloud-storage) as my object storage because I read online that its free plan was structured in a way that would cover Litestream usage for many projects at no cost. Unfortunately this hasn't worked out in practice and I've had to pay a steep $2/month for Litestream. Of course this amount is inconsequential, but something seems off here. Litestream is issuing something like 3500 [Class C transactions](https://www.backblaze.com/cloud-storage/transaction-pricing) every day which exceeds B2's free tier. I suspect it is calling ListObjectsV2 on a regular interval to do compaction. Unfortunately none of my attempts at modifying the configuration have decreased this rate. In principle I see no reason why Litestream should be continually making requests when the DB almost never changes.

My experience with Litestream overall has been mixed. The fundamental thing it does is fantastic and seems to work well, but there have been some rough edges. For example, I had to look through the commit history to find a workaround for a recently introduced bug that mysteriously caused B2 to reject the requests (`sign-payload: true`). Nevertheless, the amount of reliability per dollar I'm getting with it is fantastic.

## A web server
I used [Caddy](https://caddyserver.com/) for the web server and have been extremely pleased. It automatically sets up SSL certs for you which is wonderful, and the whole user experience has been solid. I'm using it to serve static files and proxy the rest of the traffic to the app server.

## A way to deploy
My deployment strategy is a ~100 line script called `deploy.sh`. It mostly copies files (using `scp` and `rsync`) and runs commands on the server via `ssh`. Caddy, Litestream, Grafana Alloy (used for logging), and the application are all run as `systemd` services and restarted or reloaded by the script. This was my first time really using `systemd` and it's wonderful. To run database migrations I wrote a short bash script that checks a `migration` table in the DB for the latest migration number and then runs any SQL files in `/migrations` with a higher index (`001_init.sql`, `002_add_column.sql`, etc). I could have used something like [Flyway](https://github.com/flyway/flyway), but why? This does everything I need with no dependencies.

I could have gotten away with simply `systemd restart`ing the app server, but this was too risky. If I restarted the service and the new version crashed (suppose I misconfigured an essential environment variable), boom: downtime. To avoid this, I implemented blue-green deployments in 30 lines of bash. Fortunately systemd supports parameterizing the service configuration very simply. Once that was done I could create `blue.env` and `green.env` for each service specifying port `3000` and `3001` respectively. Suppose `blue` is currently running on port `3000`: the script will start `green` on `3001`, hit `/healthcheck` to confirm it's healthy, points Caddy at `3001`, and gives the signal for `blue` to gracefully shutdown (allowing any in-flight requests to complete). What results is an extremely simple yet also robust set up with no additional dependencies.

## CI/CD
I tried out [RWX](https://rwx.com) for CI/CD on this project and have been totally blown away. I keep reading complaints about GitHub Actions online and thinking to myself "Hey, RWX solves that!". RWX executes work as chunks of compute called tasks instead of being tied to a job-per-VM model. These tasks can then be arranged in a [DAG](https://en.wikipedia.org/wiki/Directed_acyclic_graph) which you'll realize is clearly the right way to specify a CI pipeline once you try it. Each task is equipped with aggressive, automatic, content-based caching which makes the whole thing extremely fast. 
  
## A way to observe
I started out by reading logs directly with `journalctl` on the server (which works quite well honestly!), but I wanted a UI with easier querying and external log storage. To get this, I opted for Grafana Cloud's free tier. Once I had [Alloy](https://github.com/grafana/alloy), Grafana's log shipping agent, running as another `systemd` service and modified the configuration to classify the logs from `blue` and `green` as a single service, I was off to the races. Grafana Cloud is quite nice. It is _very_ feature rich which is great, but also overwhelming at times.

Originally I set up a free account in [HetrixTools](https://hetrixtools.com/) to run healthchecks every minute against my `/healthcheck` endpoint and the home page. This was dead-simple to configure and a great experience. However, once I had Grafana Cloud running, I realized I could replace the healthchecks with synthetic checks and alert rules to remove the need for HetrixTools. This works, but was much more fiddly to get working, and still isn't quite right: about twice a week I get a false positive healthcheck.

## I have made no mistakes and nothing can be improved
In the spirit of [Cunningham's Law](https://meta.wikimedia.org/wiki/Cunningham%27s_Law), I hereby assert that every decision I made was optimal and nothing can be improved about my setup. (Suggestions welcome at [isaacjvandoren@gmail.com](mailto:isaacjvandoren@gmail.com)). 

## Would I do it again?
Absolutely. What I have now is a fast, cheap, powerful, and surprisingly robust system that I understand very well. I could have certainly avoided much of this effort by using an off-the-shelf tool instead, but that's no fun and I wouldn't have learned anything.

I can't decide if this setup is simple or complicated. It's a bit of both. I see the appeal in avoiding a lot of this work by using a polished PaaS like Vercel, Railway, etc, instead, but it really was quite doable, and the end result is a very pleasant-to-work-with system. It's easy to sleep well knowing that my bill will never exceed $5/month too.

The VPS Kool-Aid is sweet. Partake 🤗 

## Psst...
Do you like building good software? Come to [Software Should Work](https://softwareshould.work)!
