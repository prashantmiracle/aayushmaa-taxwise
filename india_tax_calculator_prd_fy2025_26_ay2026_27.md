# PRD: India Tax Regime Finder & Calculator

**Product name:** Tax Regime Finder India  
**Target market:** Indian salaried employees, small business owners, and freelancers/professionals  
**Tax period covered:** FY 2025-26 income, AY 2026-27 return filing  
**Core promise:** “Find out which tax regime saves you more money.”  
**Privacy model:** Browser-first; all calculation should run locally in the user’s browser. No income data should be stored on the server unless the user explicitly opts in.

---

## 1. Important tax-year clarification

In India, people often say “tax year 2026-27” casually. For this product, the calculation baseline should be:

- **Financial Year (FY): 2025-26** — income earned from 1 April 2025 to 31 March 2026.
- **Assessment Year (AY): 2026-27** — return filed for FY 2025-26.

The app UI should show this clearly:

> This calculator is for income earned between 1 April 2025 and 31 March 2026, filed as AY 2026-27.

For future years, the tax constants should be configurable from one `taxYearConfig` file, not hard-coded inside UI components.

---

## 2. Product vision

Most Indian taxpayers do not understand CTC, gross income, taxable income, deductions, exemptions, HRA, 80C, 80D, 80CCD, Form 10-IEA, ITR-1, ITR-3, or ITR-4. But they usually know:

- How much salary/business money comes into their bank every month.
- How much rent they pay.
- Whether PF is deducted.
- Whether they have LIC/ELSS/PPF/school fees/home loan/medical insurance.
- Whether they are salaried, business owner, freelancer, or retired.

The app should start from plain-language questions and slowly convert user answers into a tax estimate.

The experience should feel like a friendly tax assistant, not a government form.

---

## 3. Primary goals

1. Help users choose between **old regime** and **new regime**.
2. Show a live, detailed comparison as they answer.
3. Teach users what each question means in simple language.
4. Recommend practical tax-saving actions based on their situation.
5. Tell users the likely ITR form: ITR-1, ITR-2, ITR-3, or ITR-4.
6. Let users download a PDF report.
7. Keep calculations private and local-first.

---

## 4. Non-goals / scope limits for V1

V1 should **not** handle:

- Surcharge calculation.
- Marginal relief on surcharge.
- Capital gains tax calculation.
- Crypto/VDA tax.
- Foreign assets/income.
- Agricultural income beyond basic ITR-form indication.
- Clubbing of income.
- Loss carry-forward.
- Alternate Minimum Tax.
- Company/LLP/partnership taxation.
- Advanced business P&L accounting.
- TDS return filing.
- Actual ITR e-filing submission.

V1 may still ask screening questions to tell the user: “This case is complex; consult a CA.”

---

## 5. User personas

### 5.1 First-job salaried person

- Age 18–30.
- Knows monthly in-hand salary.
- Does not know CTC or taxable income.
- May have rent, PF, health insurance, small investments.
- Needs a clear answer: “new regime is better” or “old regime is better.”

### 5.2 Mid-career salaried person

- Has rent/HRA, PF, LIC, ELSS, school fees, home loan, medical insurance.
- Needs old vs new regime comparison.
- Wants to know how to save more tax.

### 5.3 Freelancer/professional

- Receives client payments.
- May be eligible for presumptive taxation under section 44ADA.
- Needs ITR-3 vs ITR-4 guidance.
- Needs old vs new comparison based on simplified income.

### 5.4 Small business owner

- Has turnover and basic expense idea.
- May use presumptive taxation under section 44AD.
- Needs simple estimate and form guidance.

### 5.5 Senior citizen / super senior citizen

- Pension, interest income, rent, possible medical insurance.
- Needs age-based slab handling under old regime.

---

## 6. Experience principles

1. **Ask one thing at a time.** Never show a long form upfront.
2. **Use human language.** Avoid “80C” first; ask “Do you invest in LIC, PPF, ELSS, PF, or children’s school fees?”
3. **Show live progress.** Right-side preview must update after every answer.
4. **Explain every result.** The user should understand why a regime is better.
5. **Keep trust high.** Use official-source notes and clear disclaimers.
6. **Privacy-first.** No login required for calculator. No backend calculation needed.
7. **Mobile-first.** Most users will open from WhatsApp/Instagram.

---

## 7. Landing page requirements

### 7.1 Page goal

Convert a confused user into clicking **Start Free Tax Check**.

### 7.2 Hero section

**Headline:**  
Find out which tax regime saves you more money.

**Subheadline:**  
Answer simple questions in plain English. Compare old vs new tax regime instantly for FY 2025-26 / AY 2026-27.

**Primary CTA:**  
Start Free Tax Check

**Secondary CTA:**  
See sample report

**Trust badges:**

- Browser-only calculation
- No signup needed
- Old vs new regime comparison
- PDF report included
- Built for Indian taxpayers

### 7.3 Hero visual

Show a mock result card:

```
Recommended: New Regime
Estimated saving: ₹18,420
Old regime tax: ₹82,160
New regime tax: ₹63,740
Confidence: Good estimate
```

### 7.4 Sections below hero

1. **Why this exists**
   - Most calculators ask for CTC/gross salary.
   - This app starts with what people actually know: monthly bank credit.

2. **How it works**
   - Answer simple questions.
   - Watch live tax preview.
   - Get regime recommendation.
   - Download PDF.

3. **Who can use it**
   - Salaried employees.
   - Freelancers.
   - Small business owners.
   - Senior citizens.

4. **What it compares**
   - New regime slabs.
   - Old regime slabs.
   - HRA, 80C, 80D, NPS, home loan, professional tax, savings interest.

5. **Privacy section**
   - “Your salary and deduction data stays in your browser.”
   - “We do not upload your answers unless you choose to save/share.”

6. **Disclaimer**
   - “This is an educational calculator, not legal/tax advice. For complex cases, consult a tax professional.”

---

## 8. App layout

### 8.1 Desktop layout

Two-column layout:

- **Left 60%:** Step-by-step wizard.
- **Right 40%:** Live tax preview panel.

Right panel should be sticky.

### 8.2 Mobile layout

Single-column layout:

- Wizard first.
- Collapsible “Live tax preview” card below each step or sticky bottom summary.
- Final result full-screen.

### 8.3 Progress indicator

Show:

- Step dots or progress bar.
- Label: “Step 3 of 9”.
- Estimated completion: “About 3 minutes”.

Do not ask for login before results.

---

## 9. Main user flow

1. Landing page.
2. Start wizard.
3. Select profile type.
4. Enter income in simple terms.
5. Answer deductions/exemptions questions.
6. Review live old vs new comparison.
7. Final recommendation.
8. Personalized explanation.
9. Suggested tax-saving actions.
10. ITR form guidance.
11. Download PDF.

---

## 10. Wizard screens

### Step 1: User type

**Question:**  
Which best describes your income?

**Options:**

- I receive salary from a company.
- I run a small business.
- I am a freelancer/professional.
- I receive pension/interest/rent only.
- I have multiple types of income.

**FAQ:**

- **I have salary and freelance income. What should I choose?**  
  Choose “multiple types of income.” The app will ask both sections.

- **I sell products online. Am I freelancer or business?**  
  Usually business. Freelancers/professionals mostly provide services.

**Validation:** required.

---

### Step 2: Basic profile

**Questions:**

1. Your age on 31 March 2026?
   - Under 60
   - 60 to 79
   - 80 or above

2. Are you a resident individual for Indian tax purposes?
   - Yes
   - No / Not sure

3. Which city type do you live in for rent/HRA?
   - Metro: Delhi, Mumbai, Kolkata, Chennai
   - Other city
   - I do not pay rent

**Logic:**

- Old regime slabs change for senior citizens and super senior citizens.
- New regime slabs are same across age categories for this calculator.
- Section 87A rebate applies only to resident individuals.

**Validation:** age category required.

---

### Step 3A: Salaried income entry

Show only if salaried.

**Main question:**  
How much salary is credited to your bank every month after company deductions?

**Input:** monthly in-hand salary.

**Optional advanced toggle:**  
“I know my salary breakup.”

If advanced toggle is off, ask:

1. Does your company deduct PF every month?
   - Yes, I know the amount.
   - Yes, but I do not know the amount.
   - No.

2. How much PF is deducted monthly?  
   If unknown, estimate as 12% of basic salary only if user enters basic. Otherwise leave blank and explain estimate may be less accurate.

3. Do you receive HRA in salary?
   - Yes, I know the amount.
   - Yes, but I do not know the amount.
   - No / not sure.

4. Annual gross salary from Form 16, if available.
   - Optional.
   - If provided, use gross salary as primary.
   - If not provided, estimate annual salary from in-hand plus known deductions.

If advanced toggle is on, ask:

- Annual gross salary.
- Basic salary per month.
- HRA received per month.
- Employee PF per month.
- Professional tax per year.
- Employer NPS contribution per year, if any.
- Any other taxable allowances.

**FAQ:**

- **What is in-hand salary?**  
  The amount that comes into your bank after company deductions.

- **Why do you ask gross salary?**  
  Gross salary gives a more accurate tax result. If you do not know it, the app can still estimate.

- **What is basic salary?**  
  It is one part of salary used for PF and HRA calculation. It is usually visible in salary slip.

**Validation:**

- Monthly salary cannot be negative.
- Annual salary, if entered, must be greater than or equal to annual in-hand salary.
- Show warning if monthly in-hand × 12 is less than ₹1,00,000 but user enters large deductions.

---

### Step 3B: Business income entry

Show only if small business.

**Questions:**

1. How much money did your business receive during FY 2025-26?  
   Label: annual sales/receipts.

2. How much of this was received in cash?

3. Roughly how much profit did you make after business expenses?

4. Do you want to use presumptive taxation if eligible?
   - Yes, keep it simple.
   - No, I maintain books.
   - Not sure, explain.

**Simplified V1 logic:**

- For presumptive business under section 44AD, ask gross receipts and digital/cash split.
- V1 should use a configurable presumptive-income rule:
  - 8% for non-digital receipts.
  - 6% for digital receipts.
- If cash receipts are within the allowed threshold, turnover threshold can be higher as per applicable law/config.
- If not eligible or user declares lower income, recommend CA/tax audit check.

**FAQ:**

- **What is turnover?**  
  Total money received from customers before subtracting expenses.

- **What is profit?**  
  What remains after business expenses.

- **What is presumptive taxation?**  
  A simplified method where tax is calculated on a fixed percentage of receipts instead of detailed accounts.

---

### Step 3C: Freelancer/professional income entry

Show only if freelancer/professional.

**Questions:**

1. Total client payments received in FY 2025-26.
2. How much was received in cash?
3. Approximate work-related expenses.
4. Are you an eligible professional under presumptive taxation?
   - Designer/consultant/technical professional/legal/medical/accounting/interior/other notified profession.
   - Other service provider.
   - Not sure.

**Simplified V1 logic:**

- For eligible professionals under section 44ADA, presumptive income is generally 50% of gross receipts subject to eligibility thresholds.
- If not eligible or receipts exceed limits, recommend ITR-3/accounting-based flow.

**FAQ:**

- **What are professional receipts?**  
  Total money clients paid you before expenses.

- **Can freelancers file ITR-4?**  
  Yes, if eligible for presumptive taxation. Otherwise, generally ITR-3.

---

### Step 4: Rent and HRA

Show for salaried users who pay rent.

**Questions:**

1. How much rent do you pay per month?
2. Did you pay rent for all 12 months?
3. Do you live in Delhi, Mumbai, Kolkata, or Chennai?
4. Basic salary per month.
5. HRA received per month.

**HRA old-regime formula:**

HRA exemption = least of:

1. Actual HRA received.
2. Rent paid minus 10% of salary for HRA purpose.
3. 50% of salary for metro cities; 40% for non-metro cities.

If rent paid minus 10% salary is negative, treat that component as zero.

**New regime:**

HRA exemption should not be allowed in the new regime.

**FAQ:**

- **Can I claim HRA in the new regime?**  
  No, HRA exemption is generally not available under the new regime.

- **What if I do not know basic salary or HRA?**  
  The app can estimate but will show “low confidence.”

**Validation:**

- Rent cannot be negative.
- Months paid must be 1–12.
- HRA cannot exceed gross salary.

---

### Step 5: Common old-regime deductions

Instead of saying “80C,” ask:

**Question group:**  
Did you pay or invest in any of these during FY 2025-26?

Checkboxes with amount fields:

- EPF/VPF deducted from salary.
- PPF.
- LIC premium.
- ELSS mutual funds.
- Children’s school tuition fees.
- Home loan principal repayment.
- 5-year tax-saving FD.
- Sukanya Samriddhi.
- NSC.
- Other 80C investment.

**Calculation:**

- Aggregate under 80C/80CCC/80CCD(1) should be capped at ₹1,50,000 for old regime.
- Employee NPS own contribution under 80CCD(1B) should be separately capped at ₹50,000.
- Employer NPS under 80CCD(2) should be handled separately and may be allowed in both regimes depending on salary and employee category.

**FAQ:**

- **What is 80C?**  
  A tax-saving bucket for common investments like PF, LIC, PPF, ELSS, tuition fees, and home loan principal.

- **If my PF is already deducted, should I enter it?**  
  Yes. It counts toward the old-regime ₹1.5 lakh limit.

---

### Step 6: Medical insurance and senior citizen deductions

**Questions:**

1. Did you pay health insurance for yourself/spouse/children?
2. Did you pay health insurance for parents?
3. Are your parents senior citizens?
4. Did you pay preventive health check-up expenses?
5. Are you a senior citizen with medical expenses but no insurance?

**Suggested 80D logic:**

- Self/spouse/dependent children: cap ₹25,000; if senior citizen, cap ₹50,000.
- Parents: cap ₹25,000; if senior citizen parents, cap ₹50,000.
- Preventive check-up included inside the overall limit, with sub-limit ₹5,000.

**New regime:**

Do not allow 80D in new regime.

**FAQ:**

- **Can I claim medical insurance in the new regime?**  
  Generally no. It is an old-regime deduction.

---

### Step 7: Home loan

**Questions:**

1. Do you have a home loan?
2. Is the property self-occupied or rented out?
3. Annual interest paid.
4. Annual principal paid.
5. Loan purpose: purchase/construction or repair/renovation.

**Old regime logic:**

- Principal repayment goes under 80C cap.
- Self-occupied home loan interest under section 24(b) generally capped at ₹2,00,000 if conditions are met.
- For repair/renovation, cap may be ₹30,000.

**New regime logic:**

- Do not allow self-occupied home loan interest deduction in new regime.
- Let-out property treatment can be separately configured but V1 can keep simple and show advisory.

**FAQ:**

- **Can I claim home loan interest in new regime?**  
  For self-occupied property, no.

---

### Step 8: Interest income and other simple income

**Questions:**

1. Savings account interest during FY 2025-26.
2. FD/RD interest during FY 2025-26.
3. Pension income, if any.
4. Rental income, if any.  
   V1 can include simple gross rental income and 30% standard deduction in advanced mode only.

**Old regime deductions:**

- 80TTA: savings interest deduction up to ₹10,000 for non-senior individuals.
- 80TTB: senior citizen deduction up to ₹50,000 for interest income.

**New regime:**

Do not allow 80TTA/80TTB in V1 unless tax config confirms availability for the selected year.

---

### Step 9: Final screening questions

Ask before result:

1. Did you sell shares, mutual funds, property, or crypto during the year?
2. Did you have foreign income or foreign assets?
3. Were you a company director?
4. Did you hold unlisted equity shares?
5. Is your total income above ₹50 lakh?
6. Do you have business/professional books requiring audit?

If yes to complex items, show:

> Your case may need ITR-2/ITR-3 and professional review. This app can still show a basic salary/business estimate, but final tax may differ.

---

## 11. Live preview panel

### 11.1 Default state

Before enough data:

```
Your tax estimate will appear here
Answer a few simple questions to compare old vs new regime.
```

### 11.2 During wizard

Show cards:

1. Estimated annual income.
2. Old regime taxable income.
3. New regime taxable income.
4. Old regime tax.
5. New regime tax.
6. Current better option.
7. Confidence level.

### 11.3 Detailed breakdown tabs

Tabs:

- Summary
- Income
- Deductions
- Slabs
- Forms

### 11.4 Confidence labels

- **High confidence:** user entered gross salary, basic, HRA, rent, and deductions.
- **Medium confidence:** user entered in-hand salary and most deductions.
- **Low confidence:** user entered only in-hand salary and many unknowns.

---

## 12. Final result screen

### 12.1 Recommendation card

Example:

```
Pick the New Regime
You save approximately ₹18,420

Old regime estimated tax: ₹82,160
New regime estimated tax: ₹63,740
```

### 12.2 Side-by-side comparison

| Item | Old Regime | New Regime |
|---|---:|---:|
| Gross income | ₹X | ₹X |
| Standard deduction | ₹50,000 | ₹75,000 |
| HRA exemption | ₹X | Not allowed |
| 80C deduction | ₹X | Not allowed |
| 80D deduction | ₹X | Not allowed |
| NPS deduction | ₹X | ₹X if eligible |
| Taxable income | ₹X | ₹X |
| Tax before rebate | ₹X | ₹X |
| Rebate | ₹X | ₹X |
| Cess | ₹X | ₹X |
| Final tax | ₹X | ₹X |

### 12.3 Slab-by-slab breakdown

Show each slab row with:

- Slab range.
- Taxable amount falling in slab.
- Rate.
- Tax for that slab.

### 12.4 Personalized education section

For each input, explain impact:

- “Your rent helped reduce tax only in the old regime because HRA is not available in the new regime.”
- “Your PF/LIC/ELSS total was ₹1,20,000, so you still have ₹30,000 room under 80C.”
- “Your health insurance saved tax only in the old regime.”
- “Your income is below the rebate threshold in the new regime, so your tax became zero before cess.”

### 12.5 Suggestions

Examples:

- If 80C used < ₹1,50,000 and old regime is close:  
  “You can consider using up to ₹X more under 80C, but invest only if it suits your financial goals.”

- If NPS not used and income is high:  
  “You may consider NPS for additional old-regime deduction up to ₹50,000 under 80CCD(1B).”

- If no health insurance:  
  “Health insurance may help protect your family and can also reduce tax in the old regime.”

- If new regime wins strongly:  
  “New regime is simpler for you. Extra deductions may not change the result unless they are very large.”

### 12.6 ITR form guidance

Show likely form with plain explanation:

- **ITR-1:** Resident individual, total income up to ₹50 lakh, salary/pension, up to two house properties, other sources, limited specified capital gain conditions, and agricultural income up to ₹5,000.
- **ITR-2:** Individuals/HUFs not having business/profession income and not eligible for ITR-1.
- **ITR-3:** Individuals/HUFs having business/profession income and not eligible for ITR-4.
- **ITR-4:** Simplified form for eligible presumptive income cases under 44AD/44ADA/44AE.

Show warning:

> This is form guidance, not final filing advice. Verify on the Income Tax portal before filing.

---

## 13. Tax calculation rules for AY 2026-27

### 13.1 Old regime slabs

#### Individual below 60

| Taxable income | Rate |
|---|---:|
| Up to ₹2,50,000 | Nil |
| ₹2,50,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

#### Senior citizen: 60 to below 80

| Taxable income | Rate |
|---|---:|
| Up to ₹3,00,000 | Nil |
| ₹3,00,001 – ₹5,00,000 | 5% |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

#### Super senior citizen: 80 or above

| Taxable income | Rate |
|---|---:|
| Up to ₹5,00,000 | Nil |
| ₹5,00,001 – ₹10,00,000 | 20% |
| Above ₹10,00,000 | 30% |

### 13.2 New regime slabs for AY 2026-27

| Taxable income | Rate |
|---|---:|
| Up to ₹4,00,000 | Nil |
| ₹4,00,001 – ₹8,00,000 | 5% |
| ₹8,00,001 – ₹12,00,000 | 10% |
| ₹12,00,001 – ₹16,00,000 | 15% |
| ₹16,00,001 – ₹20,00,000 | 20% |
| ₹20,00,001 – ₹24,00,000 | 25% |
| Above ₹24,00,000 | 30% |

### 13.3 Standard deduction

For salaried employees and pensioners:

- Old regime: ₹50,000 or salary amount, whichever is lower.
- New regime: ₹75,000 or salary amount, whichever is lower.

### 13.4 Rebate under section 87A

For resident individuals only:

- Old regime: rebate up to ₹12,500 if taxable income does not exceed ₹5,00,000.
- New regime: rebate up to ₹60,000 if taxable income does not exceed ₹12,00,000.

### 13.5 Health and education cess

Apply 4% on income tax after rebate.  
Surcharge is out of scope in V1.

### 13.6 Rounding

Use rupee precision during calculations. Final tax payable can be rounded to nearest ₹10 if implementing final filing-style output, but the UI can show estimated tax to nearest ₹1 or ₹10. Keep this configurable.

---

## 14. Calculation engine design

### 14.1 Data model

```ts
type TaxpayerType = 'salaried' | 'business' | 'freelancer' | 'pensioner' | 'mixed';
type AgeCategory = 'below60' | 'senior60to79' | 'superSenior80plus';
type Regime = 'old' | 'new';

interface TaxInput {
  taxYear: 'FY2025_26_AY2026_27';
  taxpayerType: TaxpayerType;
  ageCategory: AgeCategory;
  isResidentIndividual: boolean;
  cityType?: 'metro' | 'nonMetro' | 'noRent';

  salary?: {
    monthlyInHand?: number;
    annualGrossSalary?: number;
    monthlyBasic?: number;
    monthlyHraReceived?: number;
    employeePfAnnual?: number;
    professionalTaxAnnual?: number;
    employerNpsAnnual?: number;
    pensionAnnual?: number;
  };

  business?: {
    grossReceiptsAnnual?: number;
    cashReceiptsAnnual?: number;
    digitalReceiptsAnnual?: number;
    actualProfitAnnual?: number;
    wantsPresumptive?: boolean;
    category?: 'business44AD' | 'profession44ADA' | 'goodsCarriage44AE' | 'notSure';
  };

  rent?: {
    monthlyRent?: number;
    monthsPaid?: number;
  };

  deductions?: {
    epf?: number;
    ppf?: number;
    lic?: number;
    elss?: number;
    tuitionFees?: number;
    homeLoanPrincipal?: number;
    taxSavingFd?: number;
    sukanya?: number;
    nsc?: number;
    other80C?: number;
    npsOwn80CCD1B?: number;
    employerNps80CCD2?: number;
    healthInsuranceSelfFamily?: number;
    healthInsuranceParents?: number;
    preventiveHealthCheckup?: number;
    homeLoanInterestSelfOccupied?: number;
    savingsInterest?: number;
    fdInterest?: number;
  };

  screening?: {
    hasCapitalGains?: boolean;
    hasCrypto?: boolean;
    hasForeignAssets?: boolean;
    isCompanyDirector?: boolean;
    hasUnlistedShares?: boolean;
    incomeAbove50Lakh?: boolean;
  };
}
```

### 14.2 Output model

```ts
interface RegimeResult {
  regime: Regime;
  grossIncome: number;
  exemptions: LineItem[];
  deductions: LineItem[];
  taxableIncome: number;
  slabBreakdown: SlabTaxLine[];
  taxBeforeRebate: number;
  rebate87A: number;
  taxAfterRebate: number;
  cess: number;
  finalTax: number;
}

interface TaxComparisonResult {
  oldRegime: RegimeResult;
  newRegime: RegimeResult;
  recommendedRegime: Regime;
  estimatedSaving: number;
  confidence: 'high' | 'medium' | 'low';
  warnings: string[];
  itrGuidance: ItrGuidance;
  suggestions: Suggestion[];
  educationNotes: EducationNote[];
}
```

### 14.3 Main calculation steps

```ts
function calculateComparison(input: TaxInput): TaxComparisonResult {
  const oldRegime = calculateRegime(input, 'old');
  const newRegime = calculateRegime(input, 'new');

  const recommendedRegime = oldRegime.finalTax <= newRegime.finalTax ? 'old' : 'new';
  const estimatedSaving = Math.abs(oldRegime.finalTax - newRegime.finalTax);

  return {
    oldRegime,
    newRegime,
    recommendedRegime,
    estimatedSaving,
    confidence: calculateConfidence(input),
    warnings: generateWarnings(input),
    itrGuidance: determineItrForm(input),
    suggestions: generateSuggestions(input, oldRegime, newRegime),
    educationNotes: generateEducationNotes(input, oldRegime, newRegime)
  };
}
```

### 14.4 Regime calculation

```ts
function calculateRegime(input: TaxInput, regime: Regime): RegimeResult {
  const grossIncome = computeGrossIncome(input);
  const exemptions = computeExemptions(input, regime);
  const deductions = computeDeductions(input, regime);
  const taxableIncome = Math.max(0, grossIncome - sum(exemptions) - sum(deductions));
  const slabBreakdown = applySlabs(taxableIncome, input.ageCategory, regime);
  const taxBeforeRebate = sumSlabTax(slabBreakdown);
  const rebate87A = computeRebate87A(taxBeforeRebate, taxableIncome, input.isResidentIndividual, regime);
  const taxAfterRebate = Math.max(0, taxBeforeRebate - rebate87A);
  const cess = taxAfterRebate * 0.04;
  const finalTax = taxAfterRebate + cess;

  return { regime, grossIncome, exemptions, deductions, taxableIncome, slabBreakdown, taxBeforeRebate, rebate87A, taxAfterRebate, cess, finalTax };
}
```

---

## 15. Edge cases

### 15.1 Income around rebate thresholds

- Old regime: income just above ₹5 lakh can create tax liability.
- New regime: income just above ₹12 lakh can create tax liability.
- V1 should implement normal rebate but not special marginal relief unless verified and configured.
- Show warning near thresholds:
  - “Your income is close to the rebate cut-off. Small changes can affect tax.”

### 15.2 Negative deductions

Do not allow negative values.

### 15.3 Deduction exceeds income

Taxable income cannot go below zero.

### 15.4 Unknown salary breakup

If user only enters in-hand salary:

- Estimate annual income = monthly in-hand × 12.
- Do not auto-create HRA/PF unless user enters values.
- Mark result as low/medium confidence.

### 15.5 HRA missing basic or HRA amount

If rent exists but basic/HRA missing:

- Ask user to enter salary slip values.
- If skipped, do not calculate HRA exemption.
- Show “HRA not included due to missing salary breakup.”

### 15.6 Senior citizen rebate

Age changes old-regime slab but section 87A rebate still depends on resident individual status and income threshold.

### 15.7 Business/profession regime switching

For users with business/profession income, show:

> New regime is the default. If you want to opt out and use old regime, Form 10-IEA may be required within the due date. Switching rules for business/profession taxpayers are stricter than salaried taxpayers.

### 15.8 Income above ₹50 lakh

Show out-of-scope warning:

> Your income may attract surcharge. V1 does not calculate surcharge, so final tax may be higher.

### 15.9 Capital gains

If user has capital gains, show:

> Capital gains have special tax rules. This calculator does not compute capital gains tax. Your ITR form and final tax may change.

---

## 16. Validation rules

| Field | Validation |
|---|---|
| Age category | Required |
| Monthly income | >= 0 |
| Annual gross salary | >= 0 and should be >= annual in-hand if both entered |
| Rent | >= 0 |
| Months rent paid | Integer 1–12 |
| HRA | >= 0 and <= gross salary |
| Basic salary | >= 0 and <= gross salary |
| Deductions | >= 0 |
| Health insurance | >= 0 |
| Business receipts | >= 0 |
| Cash receipts | <= total receipts |
| Digital receipts | <= total receipts |

---

## 17. PDF report requirements

### 17.1 PDF contents

1. Title: India Tax Regime Comparison Report.
2. FY/AY: FY 2025-26 / AY 2026-27.
3. Date generated.
4. User profile summary.
5. Recommendation.
6. Old vs new comparison table.
7. Slab-by-slab breakdown.
8. Input summary.
9. Deductions used and ignored.
10. Personalized education notes.
11. Suggestions.
12. ITR form guidance.
13. Disclaimer.
14. Source/reference section.

### 17.2 PDF generation

Preferred approach:

- Generate PDF fully in browser using libraries like `@react-pdf/renderer`, `pdf-lib`, or print-to-PDF CSS.
- Do not send income data to server.

---

## 18. Privacy and security requirements

1. No login needed for basic calculator.
2. All input stored in local component state by default.
3. If “save report” feature is added, use localStorage only with user consent.
4. Add “Clear my data” button.
5. Do not use analytics events that capture income/deduction amounts.
6. Analytics may track only anonymous funnel events:
   - started wizard
   - completed wizard
   - downloaded report
   - selected user type
7. Do not transmit raw tax inputs unless user explicitly chooses consultation/share.

---

## 19. UI design system

### 19.1 Look and feel

- Clean, modern, minimal.
- Trustworthy fintech style.
- White/off-white background.
- Soft cards.
- Clear typography.
- Avoid clutter and harsh colors.

### 19.2 Suggested color tokens

```css
--bg: #F8FAFC;
--card: #FFFFFF;
--text-primary: #0F172A;
--text-secondary: #475569;
--border: #E2E8F0;
--accent: #2563EB;
--success: #15803D;
--warning: #B45309;
--danger: #B91C1C;
```

### 19.3 Components

- Hero result preview card.
- Wizard card.
- Step progress dots.
- Sticky live preview panel.
- Regime comparison table.
- Slab breakdown table.
- FAQ accordion.
- Help tooltip.
- Confidence badge.
- Warning banner.
- PDF download button.

---

## 20. Suggested technical architecture

### 20.1 Frontend

Recommended stack:

- Next.js or Vite React.
- TypeScript.
- Tailwind CSS.
- Zod for validation.
- Zustand or React Context for wizard state.
- Unit-tested tax calculation engine.

### 20.2 Folder structure

```txt
/src
  /app or /pages
  /components
    LandingPage.tsx
    WizardLayout.tsx
    LivePreviewPanel.tsx
    ResultScreen.tsx
    PdfReportButton.tsx
    FaqAccordion.tsx
  /features/tax-wizard
    steps.ts
    questions.ts
    validations.ts
  /tax-engine
    config/FY2025_26_AY2026_27.ts
    slabs.ts
    deductions.ts
    hra.ts
    rebate.ts
    itrGuidance.ts
    suggestions.ts
    calculateComparison.ts
    __tests__/
  /types
    tax.ts
  /utils
    currency.ts
    pdf.ts
```

### 20.3 Tax config file

All tax constants must live in one config file:

```ts
export const FY2025_26_AY2026_27 = {
  oldRegime: {
    slabs: {
      below60: [
        { upto: 250000, rate: 0 },
        { upto: 500000, rate: 0.05 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 }
      ],
      senior60to79: [
        { upto: 300000, rate: 0 },
        { upto: 500000, rate: 0.05 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 }
      ],
      superSenior80plus: [
        { upto: 500000, rate: 0 },
        { upto: 1000000, rate: 0.20 },
        { upto: Infinity, rate: 0.30 }
      ]
    },
    standardDeductionSalary: 50000,
    rebate87A: { maxIncome: 500000, maxRebate: 12500 }
  },
  newRegime: {
    slabs: {
      allAges: [
        { upto: 400000, rate: 0 },
        { upto: 800000, rate: 0.05 },
        { upto: 1200000, rate: 0.10 },
        { upto: 1600000, rate: 0.15 },
        { upto: 2000000, rate: 0.20 },
        { upto: 2400000, rate: 0.25 },
        { upto: Infinity, rate: 0.30 }
      ]
    },
    standardDeductionSalary: 75000,
    rebate87A: { maxIncome: 1200000, maxRebate: 60000 }
  },
  cessRate: 0.04,
  oldRegimeDeductionCaps: {
    section80CCombined: 150000,
    section80CCD1B: 50000,
    section24SelfOccupiedInterest: 200000,
    section24RepairInterest: 30000,
    section80TTA: 10000,
    section80TTB: 50000
  }
};
```

---

## 21. Test cases

### Test 1: New regime zero-tax rebate case

Input:

- Below 60.
- Resident.
- Salaried gross salary ₹12,75,000.
- Standard deduction new regime ₹75,000.
- New taxable income ₹12,00,000.

Expected:

- New regime tax before rebate = ₹60,000.
- Rebate = ₹60,000.
- Tax after rebate = ₹0.
- Cess = ₹0.

### Test 2: Old regime 87A rebate case

Input:

- Below 60.
- Resident.
- Old regime taxable income ₹5,00,000.

Expected:

- Tax before rebate = ₹12,500.
- Rebate = ₹12,500.
- Final tax = ₹0.

### Test 3: Senior citizen old-regime slab

Input:

- Age 65.
- Old taxable income ₹4,00,000.

Expected:

- First ₹3,00,000 nil.
- ₹1,00,000 taxed at 5% = ₹5,000 before rebate.

### Test 4: Super senior old-regime slab

Input:

- Age 82.
- Old taxable income ₹6,00,000.

Expected:

- First ₹5,00,000 nil.
- ₹1,00,000 taxed at 20% = ₹20,000 before rebate.

### Test 5: HRA calculation

Input:

- Actual HRA ₹2,40,000.
- Rent ₹3,60,000.
- Salary for HRA ₹6,00,000.
- Non-metro.

Components:

- Actual HRA = ₹2,40,000.
- Rent minus 10% salary = ₹3,00,000.
- 40% salary = ₹2,40,000.

Expected HRA exemption = ₹2,40,000.

### Test 6: 80C cap

Input:

- EPF ₹80,000.
- LIC ₹50,000.
- ELSS ₹60,000.

Expected:

- Total entered ₹1,90,000.
- Allowed old-regime 80C = ₹1,50,000.

### Test 7: New regime ignores most deductions

Input:

- 80C ₹1,50,000.
- 80D ₹25,000.

Expected:

- Old regime allows as per caps.
- New regime ignores these deductions.

---

## 22. Content style guide

Use simple labels:

| Tax term | User-friendly label |
|---|---|
| Gross salary | Salary before tax and deductions |
| Taxable income | Income on which tax is calculated |
| 80C | Common tax-saving investments |
| 80D | Health insurance tax benefit |
| HRA | Rent benefit from salary |
| Rebate | Tax discount if income is below limit |
| Cess | Extra 4% added to tax |
| Presumptive taxation | Simple tax method for small business/freelancers |

Avoid fear-based language. Use “estimate,” “guidance,” and “verify before filing.”

---

## 23. Source references for developers

Developers must verify constants before production release using official sources:

1. Income Tax Department: Salaried Individuals AY 2026-27  
   https://www.incometax.gov.in/iec/foportal/help/individual/return-applicable-1

2. Income Tax Department: Business/Profession AY 2026-27  
   https://www.incometax.gov.in/iec/foportal/help/individual-business-profession

3. Income Tax Department: New vs Old Regime FAQs  
   https://www.incometax.gov.in/iec/foportal/help/new-tax-vs-old-tax-regime-faqs

4. Income Tax Department: Standard deduction and allowances  
   https://www.incometaxindia.gov.in/w/allowances-allowable-to-tax-payer

5. Income Tax Department: Deductions  
   https://www.incometaxindia.gov.in/w/deductions

6. Income Tax Department: ITR-1 AY 2026-27 PDF  
   https://www.incometaxindia.gov.in/documents/d/guest/itr-1-2026-eng-pdf

7. Income Tax Department: ITR-3 AY 2026-27 PDF  
   https://www.incometaxindia.gov.in/documents/d/guest/itr-3-2026-eng-pdf

8. Income Tax Department: ITR-4 / presumptive taxation guidance  
   https://www.incometax.gov.in/iec/foportal/help/individual-business-profession

---

## 24. Acceptance criteria

The app is ready for V1 launch when:

1. User can complete wizard without knowing CTC/gross salary.
2. User can optionally enter detailed salary breakup for higher accuracy.
3. Old and new regime estimates update live.
4. HRA, 80C, 80D, NPS, home loan interest, professional tax, savings interest, FD interest, pension, and business/freelance simplified income are handled.
5. Age-based old-regime slabs are implemented.
6. New-regime slabs for AY 2026-27 are implemented.
7. 87A rebate and 4% cess are implemented.
8. Surcharge/capital gains are clearly excluded with warnings.
9. Final result clearly says: “Pick this regime. You save ₹X.”
10. User receives personalized explanation and suggestions.
11. User receives likely ITR form guidance.
12. PDF report can be generated without server upload.
13. Unit tests cover slab boundaries, rebate boundaries, deduction caps, and HRA cases.
14. Privacy message is visible on landing page and before PDF generation.

---

## 25. Final developer note

This product should not look like a tax form. It should feel like a calm, intelligent assistant that converts confusing tax language into simple life questions and gives a clear answer. The core differentiator is not only calculation accuracy but also **education, confidence, and simplicity**.
