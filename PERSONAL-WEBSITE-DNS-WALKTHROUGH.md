# Personal Website — DNS Walkthrough

## Live portfolio

https://tristan-empty-but-live.vercel.app

## What my CNAME will do

A CNAME record gives one hostname another hostname as its destination. When FlyRank provisions my subdomain, the record for my assigned address—such as `tristan.flyrank.ai`—will point to the hostname Vercel provides for this project. For a normal Vercel subdomain setup, the expected target is `cname.vercel-dns.com`. I will copy the exact value displayed by Vercel when I add the custom domain instead of assuming that value has not changed.

## What happens when someone visits

When someone types my address, their browser first asks a DNS resolver where the hostname should go. The resolver may already have a recent answer cached. If not, it follows the DNS hierarchy from the root servers to the `.ai` registry and then to FlyRank's authoritative nameservers.

FlyRank's nameserver returns the CNAME record. The resolver follows its target to Vercel, obtains the connection information, and sends that answer back to the browser. The browser connects to Vercel over HTTPS and includes the hostname it requested. Vercel uses that hostname to select my portfolio deployment and sends the page with a valid TLS certificate, producing the padlock.

## Capstone checklist

1. Add the FlyRank subdomain in the Vercel project settings.
2. Copy the exact DNS target shown by Vercel.
3. Confirm that FlyRank Ops created the matching CNAME record.
4. Wait for DNS caches to update instead of changing a correct record.
5. Open the new address in a private window.
6. Verify that the portfolio loads, navigation works, and HTTPS shows a padlock.
7. Keep the existing Vercel URL active as a fallback.
