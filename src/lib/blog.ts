export type EditorialPost = {
  slug: string;
  title: string;
  description: string;
  category: "Cash flow" | "Personal finance" | "DIY guide" | "Business basics";
  format: "Explainer" | "Practical guide" | "DIY worksheet" | "Comparison";
  author: "Joshua O.";
  publishedAt: string;
  keywords: string[];
  illustration: string;
  body: string;
  sources: { title: string; url: string }[];
};

export const editorialPosts: EditorialPost[] = [
  {
    slug: "profit-is-not-cash-a-small-business-guide",
    title: "Profit Is Not Cash: A Clear Guide for Small-Business Owners",
    description: "Understand why a profitable business can still struggle to pay bills, and how to track the timing gap between sales, costs and cash received.",
    category: "Cash flow", format: "Explainer", author: "Joshua O.", publishedAt: "2026-02-12T09:00:00Z",
    keywords: ["profit vs cash flow", "small business cash flow", "working capital"], illustration: "cash-vs-profit",
    body: `A business can make a sale, record revenue and still not have the money available to pay rent tomorrow. That is not an accounting contradiction. It is a timing problem.

Profit and cash answer different questions. Profit asks whether revenue exceeded costs over a period, using the accounting method applied. Cash flow asks when money actually entered or left the bank account. A business needs both views: profit helps assess performance; cash timing helps assess whether obligations can be met.

## A simple example

Suppose a design studio completes a 4,000-currency-unit project in February and invoices the client with 30-day terms. It pays a contractor 1,500 units and rent of 900 units during February. The project may look profitable on an accrual basis, but the client’s cash may not arrive until March. The studio has to bridge that gap from its existing balance or another source.

The reverse can happen too. A customer may pay upfront for work that will take place over several months. The bank balance rises today, but some of that money is already committed to future delivery costs. A healthy balance is not automatically free-to-spend money.

## Keep three views side by side

1. **A profit-and-loss view:** revenue and expenses over a period.
2. **A cash view:** actual receipts and payments by date.
3. **A short forecast:** expected inflows, known bills, payroll, tax and debt repayments over the coming weeks.

Start with a reliable opening balance. Add receipts only when you have a reasonable basis for when they will clear; list committed outflows on the date they are expected. Mark uncertain items separately rather than treating them as guaranteed.

## What to review each week

Compare the forecast with what actually happened. Which customers paid late? Which costs were larger than expected? Did a recurring expense move? Update the next few weeks, and follow up on overdue invoices before the cash gap becomes urgent.

Separate business and personal activity where possible. When one account is used for both, the records become harder to interpret and personal transfers can look like business income or spending. Keep statements, invoices and receipts together, and check the recordkeeping rules that apply to your business structure and country.

## A weekly cash check you can keep

Choose the same day each week and review four things: the cleared balance, receipts expected in the next two weeks, obligations due in that period, and the largest uncertainty. Write down the source for each important assumption. “Customer usually pays quickly” is weaker evidence than “customer confirmed payment for Tuesday”; show the difference in your forecast.

When a gap appears, separate actions by how much control you have. You might follow up on an overdue invoice, ask a supplier whether a date can move, delay a discretionary purchase, or discuss financing before a deadline is immediate. Financing is not automatically the right response: compare total cost, repayment timing and downside scenarios with a qualified adviser.

The [IFRS Foundation’s IAS 7 overview](https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/) explains the purpose of cash-flow statements in reporting. That formal statement is different from a forward-looking cash forecast, but both reinforce a useful discipline: distinguish cash movement from profit and make timing visible.

## If the forecast shows a shortfall

First check that the starting balance matches the bank and that transfers are not counted as income. Then confirm the dates of the largest receipts and payments. A few uncertain items often explain most of the swing. Try a base case and a cautious case—for example, move a large receipt later and include a likely cost increase. Do not describe a scenario as a prediction unless evidence and a measured method support that claim.

Next list decisions by deadline. Some actions need days or weeks: contacting a customer, renegotiating a supplier schedule, or speaking with a financing provider. Other actions can wait. This ordering prevents a spreadsheet from becoming a source of anxiety without helping the owner decide what to do. If you may miss a contractual payment, contact the lender early and understand the terms before making a change.

## A practical takeaway

Do not ask only, “Did we make money?” Also ask, “When will the money arrive, what is already spoken for, and what could make the timing different?” That second conversation is the beginning of cash-flow management.

This is general business education, not accounting or tax advice. Requirements depend on your location and business structure.`,
    sources: [{ title: "IFRS Foundation: IAS 7 Statement of Cash Flows", url: "https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/" }],
  },
  {
    slug: "build-a-weekly-cash-flow-forecast",
    title: "How to Build a Weekly Cash-Flow Forecast in 30 Minutes",
    description: "A practical, low-friction way to map expected receipts, bills and balances for the next 13 weeks—even if your books are not perfect yet.",
    category: "DIY guide", format: "DIY worksheet", author: "Joshua O.", publishedAt: "2026-03-18T09:00:00Z",
    keywords: ["cash flow forecast template", "weekly cash flow", "SME finance"], illustration: "forecast",
    body: `A forecast does not need to predict the future perfectly to be useful. Its job is to make assumptions visible early enough that you can revise them and respond.

The following weekly method works in a spreadsheet, on paper, or inside accounting software. Start with the next 13 weeks. If that feels too ambitious, begin with four and extend the horizon once the routine sticks.

## Set up five columns

Create one row per week and add these columns. In the first few weeks, break out major payments by date if a weekly total hides a dangerous mid-week dip. As the horizon extends, weekly or monthly buckets are usually easier to maintain than pretending to know the exact day of a sale several months away:

| Week | Opening cash | Expected in | Expected out | Closing cash |
|---|---:|---:|---:|---:|
| Week 1 | 12,000 | 6,500 | 8,200 | 10,300 |

Closing cash is opening cash plus expected inflows minus expected outflows. The next week’s opening cash equals the previous week’s closing cash. Treat the figures as example currency units, not a benchmark.

In the example, the owner begins with 12,000 units, expects 6,500 in receipts, and plans 8,200 in payments. The closing estimate is 10,300. If one 4,000-unit receipt has not been confirmed, show a cautious case where it arrives a week later. The difference makes the decision visible: perhaps confirm the invoice, delay a discretionary order, or speak with an adviser before committing to a new expense. Do not hide a weak week by averaging it with a stronger one.

## Build the first draft

1. **Use a checked starting balance.** Reconcile it to the bank, and keep accounts separate if you can.
2. **List likely receipts by expected arrival date.** Include customer invoices and recurring sales, but label a late payer or uncertain sale as uncertain.
3. **List outflows on the week they are due.** Include payroll, rent, suppliers, tax set-asides, loan payments, subscriptions and planned owner withdrawals.
4. **Add known one-off events.** Annual insurance, equipment, school-holiday peaks or a large stock order can distort a monthly average.
5. **Calculate the closing balance.** Highlight any week where it falls below the amount you need to keep operating.

The goal is not to create false precision. If a payment date is unclear, use a range or a conservative assumption and write it beside the number. A forecast that shows uncertainty is more useful than one that hides it.

## Make the forecast earn its keep

Set a 15-minute weekly review. Replace last week’s estimates with actuals, explain the biggest variances, and roll the horizon forward. Ask: what changed, which date is tightest, and what action is still available? Possible actions might include following up on an invoice, checking a supplier payment date, adjusting a planned purchase, or speaking with a qualified adviser.

If you want a consumer-oriented budgeting worksheet, the [CFPB Your Money, Your Goals toolkit](https://www.consumerfinance.gov/consumer-tools/educator-tools/your-money-your-goals/) has practical cash-flow tools; it is published by a U.S. regulator, so local protections and terminology may differ. For business reporting context, the [IFRS Foundation’s IAS 7 overview](https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/) explains how cash flows are classified in financial statements. Neither source replaces a short-term forecast built around your own payment dates.

## Add a confidence label, not false precision

For each expected receipt, mark whether it is contracted, historically reliable, verbally indicated or speculative. Do something similar for outflows: fixed and scheduled, variable but recurring, or discretionary. A small note beside the number can matter more than another decimal place. It tells a reader which assumptions deserve follow-up.

At the weekly review, record actual cash beside the forecast. Calculate the difference for the few largest items and ask why it happened. Was the customer late, was the invoice not approved, did a bill rise, or did an owner transfer get misclassified? Use the answer to update the next forecast rather than rewriting last week’s estimate to make it look accurate.

Keep the worksheet simple enough to maintain. One tab can hold the weekly view; a second can list the underlying items, expected dates, confidence and evidence. Use formulas for opening plus inflows minus outflows, and check them with a hand-calculated row before relying on the sheet. Protect formula cells if others will edit it, and keep an untouched copy of the prior week so you can understand what changed. Avoid adding elaborate charts until the basic dates and categories are dependable.

Your first forecast will be imperfect. The weekly habit is what makes it better. Store a short explanation of each significant forecast change. Over a few cycles, you can see whether delays cluster around particular customers, seasons, billing processes or owner decisions. That history makes later assumptions more grounded than simply extending last month’s average.`,
    sources: [{ title: "IFRS Foundation: IAS 7 Statement of Cash Flows", url: "https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/" }, { title: "CFPB: Your Money, Your Goals toolkit (United States)", url: "https://www.consumerfinance.gov/consumer-tools/educator-tool/your-money-your-goals/" }],
  },
  {
    slug: "a-bill-calendar-for-less-stressful-months",
    title: "A Bill Calendar Can Make Your Monthly Budget More Realistic",
    description: "A simple DIY bill calendar helps you see not only how much you owe, but when your income and commitments meet—or miss each other.",
    category: "Personal finance", format: "Practical guide", author: "Joshua O.", publishedAt: "2026-04-22T09:00:00Z",
    keywords: ["bill calendar", "personal budget", "upcoming commitments"], illustration: "bill-calendar",
    body: `A monthly budget can look balanced on paper and still leave a difficult week. The reason is often timing: rent, loan repayments and utilities may fall due before the next income arrives.

A bill calendar makes the timing visible. It is not a forecast of every financial surprise, and it cannot make a shortfall disappear. It is a way to notice the tight weeks earlier and decide what to do while there are still options.

## Make your calendar in four steps

1. Gather recent statements, bills, receipts and payment notifications.
2. Write down each commitment, its usual amount, due date and whether it is fixed or variable.
3. Add expected income dates and amounts. If income varies, use a cautious estimate rather than the best month you have had.
4. Mark irregular costs too: annual renewals, school expenses, medical costs, travel or family support.

Now scan week by week. Which days have several payments clustered together? Does the cash available before those dates cover the essentials? If not, note the size and timing of the gap. Some providers may allow a due-date change, but check the terms and whether moving it affects fees or interest.

## Turn the calendar into reminders

Set a reminder a few days before a large or important commitment—not just on the due date. Check whether the payment is automatic, whether the account has enough available funds, and whether the amount changed. A reminder should help you review, not imply that a balance or payment is guaranteed.

## Turn a calendar into a decision aid

Add three pieces of context to each item: expected amount or range, confidence, and next action. “Utilities, around 140, estimate, check latest bill” is more useful than a bare calendar entry. For a payment that depends on another person or organization, record the contact route and when you last confirmed the date.

Then look for clusters. If several essential payments land before the next reliable income, consider whether a provider offers a due-date change, whether a transfer between accounts needs to be timed, or whether you should contact a creditor before a payment is missed. Check any fees, interest or contractual effect before changing dates. A calendar is an early-warning tool; it cannot guarantee that income will arrive or recommend a product without understanding your full circumstances.

The [Consumer Financial Protection Bureau’s bill-calendar guide](https://www.consumerfinance.gov/archive/blog/budget-help-manage-your-monthly-expenses-bill-calendar/) recommends recording what each bill is for, its amount and due date, then checking the calendar regularly. This is U.S.-published educational material; its basic calendar technique is widely useful, but local consumer rights and payment systems differ. Its [emergency-savings guidance](https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/) also discusses how income-and-expense timing can create shortfalls, and why automated transfers should be balanced against the risk of overdrawing an account.

If you share a household account, make the reminder useful to the people who act on it. Include the bill name, expected amount, due date and whether someone has already confirmed it. Avoid storing full card numbers or sensitive login data in a shared calendar. Keep private details to a minimum and restrict access to people who need it.

Decide which commitments deserve a reminder. A stable automatic payment may need less attention than a variable bill or annual renewal. If an amount changes, make the reminder ask you to check the latest bill instead of presenting a guess as fact. Too many alerts become background noise; keep the ones that give you time to take meaningful action.

## Keep the calendar useful

Update the amount when a bill changes. Mark a payment only after it clears. Review the next month before the current one ends, and keep a small note of anything you could not verify. If you share household expenses, agree who checks each item so that reminders do not create duplicate payments.

An example week might show income arriving on Friday, rent due on Monday and insurance due on Wednesday. A monthly budget could show income exceeding spending overall while missing the fact that the account needs enough cash on Monday. Add the opening balance and dates to see the short gap, then consider only actions that are realistic: confirming an incoming payment, moving a permitted due date, or reducing an optional expense. Avoid taking expensive short-term credit just because a calendar shows a gap; compare alternatives and terms carefully.

Use a calendar, spreadsheet or banking tool—whichever you will actually revisit. The best system is the one that makes the next commitment visible without creating more admin than the problem itself. Try it for a full month and note which reminders changed an action, which created noise, and which commitments were missing. Reduce alerts that do not help someone decide; keep the ones that offer enough lead time to respond.`,
    sources: [{ title: "CFPB: Bill Calendar—Know What You Owe and When It’s Due (United States)", url: "https://www.consumerfinance.gov/archive/blog/budget-help-manage-your-monthly-expenses-bill-calendar/" }, { title: "CFPB: An Essential Guide to Building an Emergency Fund (United States)", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" }],
  },
  {
    slug: "why-invoices-age-and-how-to-build-a-follow-up-rhythm",
    title: "Why Invoices Go Unpaid: A Clear Follow-Up Rhythm",
    description: "Build a respectful, repeatable invoice follow-up process, spot stale receivables and avoid treating an issued invoice like cash in the bank.",
    category: "Cash flow", format: "Practical guide", author: "Joshua O.", publishedAt: "2026-05-20T09:00:00Z",
    keywords: ["invoice follow-up", "accounts receivable", "late payments"], illustration: "receivables",
    body: `An unpaid invoice is more than an administrative task. Until the customer pays, the amount is an expected inflow—not available cash. When several invoices age together, a business can face pressure even when sales look healthy.

The answer is not to send increasingly urgent messages without context. A consistent process makes it easier for the customer to resolve a missed document, an approval delay or a genuine dispute, and gives the business a clearer view of what may arrive.

## Start before the invoice goes out

Confirm the customer’s legal or billing name, purchase-order requirements, delivery acceptance process, billing contact, payment method and agreed terms. Send the invoice promptly after the agreed milestone. Include a unique invoice number, issue date, due date, itemized description, amount, currency, payment instructions and a contact for questions.

## Use a simple sequence

- **At issue:** send the invoice and confirm it reached the right person.
- **Before the due date:** send a courteous reminder with the invoice attached and payment details visible.
- **Just after the due date:** ask whether it is approved for payment or needs correction. Keep the tone neutral.
- **If it remains unpaid:** agree a next check-in date, record the reason and escalate internally based on the customer relationship and your written terms.

This cadence is a starting point, not a legal rule. Contract terms, local payment rules and customer circumstances differ. If an invoice is disputed, pause generic reminders and resolve the underlying issue.

Keep a single source of truth for status. If the sales lead, finance colleague and owner each maintain a separate spreadsheet, a customer may receive duplicate messages or the forecast may count the same receipt twice. Assign one person to update the expected date and record a brief note when status changes. For a small team, a shared receivables list with clear ownership can be enough.

## Use an aging view

Group open invoices by age—for example, not yet due, 1–30 days overdue, 31–60, and over 60. The purpose is not to label a customer as risky from one late payment. It is to prioritize follow-up and identify patterns: are a few large invoices concentrated with one customer? Do approvals stall at the same step? Is a particular service regularly invoiced late?

At a weekly review, compare the open-invoice list with expected cash dates in your forecast. Be conservative: an invoice marked “sent” does not guarantee the payment date. Update the expected date when the customer confirms it, and record uncertainty separately.

Keep the invoice, proof of delivery, approval and messages together. This creates a clear trail for follow-up and reconciliation. Document-retention and e-invoicing requirements vary by country and may change, so use the tax authority or professional guidance relevant to your location rather than a global article as a compliance checklist.

## Measure the process, not just overdue totals

At month-end, look at the median days from invoice issue to cash receipt, the share paid on or before the due date, and the value sitting in older aging bands. Segment by customer and invoice type before drawing conclusions. A few exceptional disputes can distort a headline average; a consistent pattern in one approval workflow is often more actionable.

An aging report is not a credit decision. Combine payment history with contract terms, concentration, dispute status and current communications, and let a person review consequential actions. The [IFRS Foundation’s IAS 7 page](https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/) provides reporting context on cash movement; it does not prescribe a collections cadence. Treat the follow-up sequence above as an operational starting point, not a legal standard.

Use the numbers to improve the process. If invoices routinely go out days after a milestone, shorten the internal hand-off. If payment is delayed by missing purchase-order details, confirm them before work begins. If one large customer dominates expected receipts, show the concentration in your forecast rather than relying on a single expected date. Review patterns without turning a late payment into an unsupported claim about a customer’s character or creditworthiness.

The best collections process is clear, documented and human. It gives customers a simple way to pay or ask for help—and gives the business a realistic view of when cash may actually arrive.`,
    sources: [{ title: "IFRS Foundation: IAS 7 Statement of Cash Flows", url: "https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/" }],
  },
  {
    slug: "price-with-costs-not-competitor-guesswork",
    title: "How to Price a Service Without Guessing at Your Real Costs",
    description: "A practical pricing worksheet for service businesses: include delivery time, overhead, payment costs and capacity before deciding what a price must cover.",
    category: "Business basics", format: "DIY worksheet", author: "Joshua O.", publishedAt: "2026-06-25T09:00:00Z",
    keywords: ["small business pricing", "service pricing", "contribution margin"], illustration: "pricing",
    body: `“What do competitors charge?” is a useful research question. It is not a complete pricing method. A price that fits the market can still be unsustainable if it does not account for the time, materials, overhead and risk required to deliver the work.

This worksheet helps you understand a floor—not dictate the final price. Customer value, positioning, demand, capacity and local rules all matter too.

## Build a cost picture for one offer

Choose a clear unit: one project, one day of work, one monthly retainer or one product bundle. Then list:

1. **Direct delivery costs:** contractor time, materials, shipping, transaction fees or subcontractors tied to this sale.
2. **Your delivery hours:** include preparation, meetings, revisions, administration and follow-up—not only time in front of the customer.
3. **A share of operating costs:** software, workspace, insurance, bookkeeping, marketing and other recurring costs.
4. **Capacity and contingency:** account for leave, quiet periods, rework and the fact that not every working hour is billable.

If you sell physical goods, include landed product cost, packaging, fulfilment, returns and payment fees. If you sell services, set a realistic delivery-hour estimate and a consistent way to allocate overhead.

## A small example

Assume a service costs 500 currency units in direct expenses. You estimate 10 hours to deliver it. If your planning rate is 80 per hour and you allocate 200 units of overhead, your cost picture is 1,500 before tax, profit and any contingency. A quoted price below that may still be a deliberate customer-acquisition choice—but you should know the subsidy and how long it can last.

Do not treat the planning rate as personal take-home pay or a universal benchmark. Tax, employer contributions, local wages, currency, utilization and business structure vary widely.

## Compare price with what happened

After each job, record estimated versus actual time and costs. If revisions regularly double the effort, tighten the scope or adjust the price. If customers consistently choose a package quickly, learn why—but do not assume that means it is underpriced. Track conversion, delivery quality, repeat work and contribution together.

For a second pass, test the price against three scenarios: the expected delivery effort, a slow month with less utilization, and a scope change or rework event. If a small variation in time turns the job unprofitable, your scope, pricing structure or estimate needs attention. Decide what is included, what triggers a change request, how many revisions are covered, and when payment is due. These operational terms can protect margin as much as the headline rate.

Do not copy a competitor’s price without comparing the offer. Their brand, customer segment, delivery speed, reputation, geography and capacity may differ. Research the market to understand alternatives and customer expectations, then choose a price that fits your economics and the value you can credibly deliver. Revisit it when wages, supplier costs, platform fees or customer demand changes.

When testing a new price, avoid changing several things at once. Record the offer, who it was shown to, the response, and the actual work delivered. A discount can be useful for a defined purpose, but if every customer negotiates one, the list price may not reflect the price the market accepts. A clear scope and package structure can make conversations about value more productive than dropping the price before you understand the concern.

If you have several offers, make a small comparison table: expected hours, direct expenses, allocated overhead, contribution after direct costs, and the customer outcome promised. This can reveal that a lower-priced package is healthy when it takes much less time, while a premium custom service is losing money because it includes unpriced revisions. Revisit assumptions when your delivery process changes; a price that once worked may no longer reflect the work being done.

## Add a margin-of-safety test

Once you have a baseline cost, change one assumption at a time. What if delivery takes 20% longer? What if a review round is added? What if a payment provider or marketplace fee changes? What if a quiet period reduces the number of projects across which you can spread overhead? These are not predictions; they reveal how sensitive the offer is to ordinary variation.

Make an explicit decision about which costs belong in the quote and which are business overhead. A software subscription may be shared across clients, while a paid stock asset might be unique to one deliverable. Allocation is not exact for every small operator, but a consistent method is easier to explain and refine than a new guess for each job. Keep a note of assumptions so future quotes do not start from scratch.

For tax, employment and regulated pricing questions, get advice specific to your business and country.`,
    sources: [{ title: "U.S. Small Business Administration: Break-even point calculator (United States)", url: "https://www.sba.gov/counseling/plan-your-business/break-even-point-calculator/" }],
  },
  {
    slug: "xero-vs-float-vs-flowcfo",
    title: "Xero vs Float vs FlowCFO: Which One Fits?",
    description: "Compare Xero accounting, Float cash-flow forecasting and FlowCFO financial guidance, including current U.S. pricing and partner API use cases.",
    category: "Business basics", format: "Comparison", author: "Joshua O.", publishedAt: "2026-08-14T09:00:00Z",
    keywords: ["Xero vs Float", "cash flow forecasting software", "financial intelligence API", "SME cash flow tools"], illustration: "comparison",
    body: `Xero, Float and FlowCFO serve different roles in a financial workflow. Xero provides accounting and bookkeeping; Float focuses on cash-flow forecasting; FlowCFO focuses on customer-facing financial guidance for consumers and small businesses, with APIs for banks and platforms. This comparison helps you identify which layer best fits the decision you need to support.

This comparison uses the vendors’ U.S. public pricing pages checked on 29 October 2026. Prices and feature availability vary by country, taxes, promotions and billing period; check the vendor’s current local page before purchasing.

| Product | Main job | Published U.S. price snapshot | Best fit | Role in the finance stack |
|---|---|---|---|---|
| [Xero](https://www.xero.com/us/) | Cloud accounting: invoices, bills, reconciliations, reports and related workflows | Early $27/mo, Growing $59/mo, Established $97/mo from 1 Oct 2026; taxes and add-ons extra | A business that needs a structured accounting record and connected bookkeeping | Accounting records, invoicing and reporting; planning tools vary by tier |
| [Float](https://www.floatapp.com/) | Short- and longer-horizon cash forecasting using accounting-system data | Essentials $130/mo monthly or $105/mo on annual billing; USD price, before applicable taxes | Finance teams wanting rolling scenarios and cash visibility alongside accounting software | Cash forecasts and scenarios using supported accounting integrations |
| [FlowCFO](https://flowcfo.net/) | Consumer and small-business financial guidance, with partner APIs for embedded experiences | Assisted access; contact FlowCFO for scope and pricing | Banks and platforms exploring customer-facing guidance, and small businesses seeking cash-flow context | Scope, data sources, deployment and integration are confirmed during the customer conversation |

## What Xero does well

Xero is the system of record in this comparison. Its public U.S. plans describe accounting capabilities such as invoicing, bill management, bank reconciliation and reporting; higher tiers add more extensive cash-flow and planning features. A ledger matters because forecasts are only as trustworthy as their opening balance, transaction classification and commitments. If your books are incomplete, improving bookkeeping may be the first useful investment.

Its official U.S. pricing update states that, from 1 October 2026, the regular monthly prices are $27 for Early, $59 for Growing and $97 for Established, before tax and optional add-ons. Promotions can temporarily show lower introductory prices. Confirm the selected tier’s transaction limits and cash-flow features before comparing it with another service.

## What Float adds

Float positions itself around cash-flow planning rather than bookkeeping. It describes a 13-week cash view, monthly forecasts extending beyond that horizon, scenarios and integrations with Xero and QuickBooks Online. This can be useful when a finance team wants to model “what if this invoice is late?” without rebuilding a spreadsheet each week.

Its official pricing page lists Essentials at $130 per month on monthly billing or $105 per month on annual billing, before tax; its published plans differ by revenue and entity needs. Float’s website says Essentials targets companies below £2m revenue and Growth targets those above that level—the published threshold is expressed in pounds even when viewing USD pricing. Check eligibility and the current amount with Float directly.

## Where FlowCFO is different

FlowCFO brings a customer-guidance perspective to financial data: helping people understand spending and upcoming commitments, helping businesses see cash-flow pressure sooner, and giving partner institutions an API route to offer relevant guidance in their own experiences. Product recommendations can be shaped around the institution’s catalogue and policies.

That approach is especially relevant when a bank, platform or business wants to connect financial signals with a customer-facing next step. FlowCFO currently arranges access through direct conversations; data connectors, service levels, deployment boundaries, model configuration and integration scope are agreed for each evaluation. This lets both teams define a focused use case and the evidence needed before expanding it.

## How to choose

- Need a reconciled general ledger, invoices and bookkeeping? Start by evaluating accounting software such as Xero, QuickBooks or a locally suitable alternative.
- Already have reliable accounting data but need rolling scenarios and forecast management? Evaluate Float or another cash-planning product against your forecast horizon, integrations and entity model.
- Want financial insights embedded in a consumer or SME journey, with institution-defined recommendations and early warnings? Discuss a bounded FlowCFO pilot. Ask for a documented data map, supported input formats, human-review controls, latency and accuracy measures, security evidence, and a written statement of what is live versus planned.

Often these are complementary layers: bookkeeping establishes a record, forecast software helps finance teams model future cash, and a guidance layer may help customers or partner staff act on relevant signals. Do not buy a tool because a feature list sounds broad; map your decision, source data, owner and action first.

### Want to see whether FlowCFO fits your use case?

FlowCFO is currently arranging access through direct conversations. Tell us whether you are evaluating consumer guidance, SME cash-flow early warning, an API integration, or a specific data workflow. We will clarify what is demonstrable today, what requires customer configuration, and what would need to be built or validated in a pilot. [Talk with FlowCFO](https://flowcfo.net/contact).

This article is independent educational content. Prices and terms can change; confirm them on each vendor’s official page before purchasing. It is not accounting, tax, legal or financial advice.`,
    sources: [{ title: "Xero U.S. plans and pricing", url: "https://www.xero.com/us/pricing-plans/" }, { title: "Xero U.S. pricing change effective 1 October 2026", url: "https://www.xero.com/us/pricing-plans/update/" }, { title: "Float pricing (official)", url: "https://www.floatapp.com/pricing" }, { title: "Float product and integrations (official)", url: "https://www.floatapp.com/product" }],
  },
  {
    slug: "separate-business-and-personal-money-without-overwhelm",
    title: "Mixing Personal and Business Money? A Practical Reset",
    description: "A step-by-step way to untangle mixed transactions, improve visibility and create a cleaner routine without pretending the cleanup is instant.",
    category: "Business basics", format: "Practical guide", author: "Joshua O.", publishedAt: "2026-09-17T09:00:00Z",
    keywords: ["separate business finances", "small business bookkeeping", "business records"], illustration: "separation",
    body: `Many owners start with the account they already have. The trouble appears later: it becomes harder to tell whether a transaction was business income, a personal purchase, an owner contribution or a reimbursement. That uncertainty can make cash-flow decisions and bookkeeping slower.

You do not need to reconstruct years of records in one sitting. Start with a clear, documented process and ask a bookkeeper or accountant where the boundary matters for your business structure and country.

## A practical reset

1. **Choose a business transaction path.** Where possible, use a dedicated account and payment method for business activity. Confirm account eligibility and fees with your institution.
2. **Stop adding ambiguity.** From a chosen date, route new business receipts and costs through the business path. If you must pay a business cost personally, record it as an owner-paid expense or contribution using the method your accountant recommends.
3. **Review recent activity.** Export statements and mark transactions as business, personal, transfer, or needs review. Do not guess when the evidence is unclear.
4. **Attach context.** Keep invoices, receipts, approvals and short notes with the transaction. A transfer between your own accounts is not the same as a customer sale.
5. **Reconcile on a schedule.** Monthly is better than “sometime before tax filing.” Compare the ledger with statements and investigate differences while details are still fresh.

## Why context matters

A bank statement shows that money moved; it may not explain why. Without a consistent label or supporting document, a dashboard can mistake transfers for income or overlook a commitment that is still unpaid. Human review remains essential when transaction descriptions are ambiguous.

Keep bank statements, cash-in and cash-out records, supplier and customer invoices, receipts and notes for expenses paid personally on the business’s behalf. Local recordkeeping rules and required retention periods differ, so verify the official guidance that applies to your location and legal structure.

The right accounting treatment may depend on whether you operate as a sole proprietor, partnership, corporation or another structure. An owner withdrawal is not automatically the same as a payroll expense, and putting personal funds into a business is not customer revenue. Do not use a generic article to decide how these transactions affect tax, ownership or statutory accounts. Ask an accountant or bookkeeper for a rule that fits your structure, then document it so your records stay consistent.

For the next statement period, create a short cleanup table with date, amount, original description, proposed category, evidence and reviewer. Sort the items by risk and size rather than trying to label every coffee receipt first. A large transfer, owner-paid supplier invoice or customer refund may change the interpretation of the cash position much more than a small expense. Keep the source file unchanged and save the cleaned copy separately, so corrections remain explainable. When a professional advises a reclassification, note the reason and any period it applies to.

## A careful way to clean old activity

Pick one or two recent statement periods and create a review queue before changing historical records. Start with large, repeated or tax-sensitive items. Keep the original description and attach evidence; note who made each classification and when. If you cannot tell whether an item is a loan, owner contribution, reimbursement or expense, flag it for a qualified bookkeeper or accountant rather than forcing a guess.

When the basic separation is in place, put a recurring review in the calendar. A weekly capture routine prevents new ambiguity from piling up; a monthly reconciliation catches duplicate imports and missing documentation. This is also the moment to check whether a dedicated account has fees, eligibility conditions, minimum balances or restrictions that make it unsuitable.

## Keep it manageable

Set a weekly 20-minute “money admin” block. Capture receipts, categorize new transactions and review upcoming bills. If you have years of mixed activity or complex tax questions, ask a qualified professional to help prioritize the cleanup rather than relying on a generic checklist.

The aim is not perfect bookkeeping overnight. It is to make the next business decision from records that are a little clearer than they were last month. Once a month, review the categories that still cause doubt. If the same ambiguity repeats, create a written rule or ask a professional to decide how it should be treated. Keep the rule visible to anyone who records transactions so that one person’s interpretation does not quietly become another person’s error.`,
    sources: [{ title: "IFRS Foundation: IAS 7 Statement of Cash Flows", url: "https://www.ifrs.org/issued-standards/list-of-standards/ias-7-statement-of-cash-flows/" }, { title: "U.S. Internal Revenue Service: Recordkeeping guide (United States)", url: "https://www.irs.gov/businesses/small-businesses-self-employed/what-kind-of-records-should-i-keep" }],
  },
  {
    slug: "irregular-income-budgeting-with-a-cash-flow-calendar",
    title: "Budgeting With Irregular Income: Plan for Timing",
    description: "A practical plan for freelancers and variable-income households: protect essential bills, estimate cautiously and build a realistic buffer.",
    category: "Personal finance", format: "Practical guide", author: "Joshua O.", publishedAt: "2026-10-29T09:00:00Z",
    keywords: ["irregular income budget", "freelancer finances", "cash flow calendar"], illustration: "irregular-income",
    body: `A monthly average can hide a difficult reality: income may arrive in uneven amounts, while rent, utilities and loan payments still have fixed dates. If your income varies, planning only from a “typical month” can make the tight weeks invisible.

This approach focuses on timing and a cautious baseline. It is not a promise that income will arrive or a rule that fits every household.

## Start with the essentials and their dates

List housing, utilities, food, transport, health costs, minimum debt payments and other commitments you must protect. Add the due date and whether the amount is fixed or changes. Include irregular costs that happen only a few times a year by estimating their date and setting aside a little when income permits.

Next, map income by likely arrival date—not just the month it belongs to. For a client invoice, use the payment date you have evidence for, and mark it uncertain if the customer has not confirmed it. For gig work, use recent records and a conservative estimate instead of assuming your strongest week will repeat.

## Use a floor and a buffer

Choose a planning floor based on lower, more dependable income where possible. When income exceeds essentials and near-term commitments, decide in advance how to divide the remainder among upcoming irregular bills, savings goals, debt reduction and flexible spending. The percentages should reflect your priorities and obligations; there is no universal split.

If you are building an emergency reserve, begin with an amount that is realistic to maintain. The [Consumer Financial Protection Bureau](https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/) suggests tracking cash-flow timing and notes that automatic savings should be balanced against the risk of overdrawing an account. A small, sustainable transfer is often more workable than setting an ambitious amount you must reverse.

## When a week looks short

Review the calendar early. Confirm expected income, check whether a due date can be adjusted, and contact a lender or service provider promptly if you may miss a payment. The CFPB’s [unexpected-job-loss guide](https://www.consumerfinance.gov/consumer-tools/unexpected-job-loss/) recommends contacting companies where you hold accounts or owe payments to discuss available help. Options and consumer protections vary by location.

## Build a buffer without breaking the plan

There is no universal emergency-fund target that fits every household. A freelancer with a long client-sales cycle may need a different reserve from someone with stable employment, and dependents, health needs, debt, access to support and local safety nets all matter. Choose an initial amount that protects one likely disruption, then review it as circumstances change. A small reserve that stays available can be more useful than an aspirational target that causes repeated borrowing.

Separate “money available today” from “money free to spend.” If next week includes rent, a loan payment and a large annual bill, the current balance can overstate flexibility. A calendar that maps expected income against commitments helps make that distinction visible. Compare fees, interest and access conditions under the rules where you live before choosing a place to keep the reserve.

## When an income pattern changes

Revisit the plan when you change jobs, lose a regular client, take on caregiving responsibilities, move home, or face a new health or debt cost. Do not assume the previous month’s average still describes your current situation. Rebuild the list of essentials and due dates, then use only the income you can reasonably expect. If the change is temporary, note when you will review the plan again.

For freelancers, separate work revenue from the amount available for personal spending. Money received for a project may need to cover software, subcontractors, equipment, unpaid time and a future period with fewer assignments. The business and household plans are connected, but they answer different questions. A simple transfer rule can help—for example, move a consistent share to personal spending only after known business costs and commitments are covered. The appropriate method depends on the business structure and local tax rules, so do not treat a percentage from someone else’s situation as universal.

## A weekly review that takes ten minutes

Update what actually arrived, mark cleared payments, and move uncertain income to a more cautious date if needed. Ask which essential commitment comes next and what cash will remain afterward. Over time, the record shows whether your assumptions are becoming more accurate.

If a month is already short, avoid building the plan around income that is only possible. Prioritize essentials and contractual commitments, confirm what money is actually available, and contact relevant providers early to ask about options. The [CFPB’s unexpected-job-loss guide](https://www.consumerfinance.gov/consumer-tools/unexpected-job-loss/) is U.S.-specific educational material; local protections and available support differ. If debt, missed essentials or financial distress is building, speak with a reputable local financial counselor or qualified professional. You deserve guidance grounded in your circumstances, not a generic formula.`,
    sources: [{ title: "CFPB: An Essential Guide to Building an Emergency Fund (United States)", url: "https://www.consumerfinance.gov/an-essential-guide-to-building-an-emergency-fund/" }, { title: "CFPB: Unexpected Job Loss (United States)", url: "https://www.consumerfinance.gov/consumer-tools/unexpected-job-loss/" }],
  },
];

export function getEditorialPost(slug: string) {
  return editorialPosts.find((post) => post.slug === slug) ?? null;
}

export function getReadingMinutes(body: string) {
  return Math.max(3, Math.ceil(body.trim().split(/\s+/).length / 220));
}
