# Phased Execution Plan: Tax Regime Finder India (FY 2025-26)

This plan outlines the step-by-step development of the India Tax Calculator. Each phase is designed to be completed in one session, resulting in a runnable application that can be verified immediately.

---

## Phase 1: Project Foundation & App Shell
**Goal:** Establish the technical foundation and layout.
- Initialize project with React, TypeScript, and Vanilla CSS.
- Create a global `theme.css` with color tokens (premium dark/light mode), typography (Inter/Outfit), and spacing.
- Build the main `App` layout with a sticky header and footer.
- **Runnable State:** A blank but themed shell with a "Coming Soon" message.

## Phase 2: High-Conversion Landing Page
**Goal:** Implement the "Wow" factor and entry point.
- Build the Hero section with the headline, subheadline, and "Start Free Tax Check" CTA.
- Create the "Mock Result Card" visual as described in PRD section 7.3.
- Implement the "How it works" and "Privacy" sections with modern iconography.
- **Runnable State:** A fully styled, responsive landing page where clicking "Start" leads to an empty wizard shell.

## Phase 3: Config & State Setup
**Goal:** Define the tax logic constants and application state.
- Create `taxYearConfig.ts` containing slabs, standard deductions, and rebate rules for FY 2025-26.
- Set up a central state/context to store `TaxInput`.
- Implement basic routing to move between the Landing Page and the Wizard.
- **Runnable State:** No visual change, but the infrastructure for calculations and navigation is ready.

## Phase 4: Basic Profile Wizard (Steps 1 & 2)
**Goal:** Capture the user's base identity.
- Build **Step 1 (User Type)**: Selection for Salaried, Business, Freelancer, etc.
- Build **Step 2 (Basic Profile)**: Age category, Residency, and City type.
- Implement a progress indicator (Step 1 of X).
- **Runnable State:** Users can select their profile and age; selections are persisted in state as they click "Next".

## Phase 5: Salaried Income Screen (Step 3A)
**Goal:** Implement the primary income entry for most users.
- Create the "Monthly In-hand" input field.
- Implement the "Advanced Toggle" to show/hide fields like Basic Salary and PF.
- Add tooltips/FAQs for "What is in-hand salary?"
- **Runnable State:** Salaried users can enter their income; "Next" button validates the input.

## Phase 6: Core Calculation Engine & Basic Logic
**Goal:** Turn inputs into initial tax numbers.
- Implement the `calculateTax` utility function handling:
    - Standard Deduction (₹50k vs ₹75k).
    - New Regime Slabs (up to ₹24L+).
    - Old Regime Slabs (Age-based).
    - Section 87A Rebates (₹12L limit for New Regime).
- **Runnable State:** The app now computes tax in the background based on the income entered in Phase 5.

## Phase 7: Live Preview Panel (Desktop & Mobile)
**Goal:** Provide instant feedback as requested in Experience Principles.
- Build the sticky Right Panel (Desktop) and the sticky Bottom Summary (Mobile).
- Show "Estimated Annual Income", "Old Tax", and "New Tax".
- Add "Confidence Level" labels based on data completeness.
- **Runnable State:** As users type their salary in Step 3, they see the tax numbers update instantly on the side.

## Phase 8: Rent & HRA Wizard (Step 4)
**Goal:** Handle the most common salaried exemption.
- Build the HRA input screen (Rent paid, months, etc.).
- Implement the 3-point HRA exemption formula for the Old Regime.
- Update the Live Preview to show HRA's impact on the Old Regime tax.
- **Runnable State:** Salaried users can see how their rent reduces their Old Regime tax in real-time.

## Phase 10: Deduction Checklists (Steps 5 & 6)
**Goal:** Implement the "Human Language" investment questions.
- Build **Step 5 (80C)**: Checklist for PF, LIC, PPF, ELSS, etc. (Capped at ₹1.5L).
- Build **Step 6 (80D)**: Medical insurance questions with senior citizen parent logic.
- **Runnable State:** Users can check boxes and enter amounts; the Live Preview updates the "Old Regime" tax accordingly.

## Phase 10: Business & Freelancer Logic (Steps 3B & 3C)
**Goal:** Support non-salaried personas.
- Build the Business receipts/cash-split screen (44AD logic).
- Build the Freelancer professional receipts screen (44ADA logic).
- Implement the presumptive income calculation (6%/8%/50%).
- **Runnable State:** Business owners and freelancers can now use the tool to see their tax estimates.

## Phase 11: Final Screening & ITR Guidance (Step 9)
**Goal:** Handle complexity and identify the correct form.
- Create the "Final Screening" checklist (Foreign assets, Crypto, >₹50L income).
- Implement the logic to suggest ITR-1, 2, 3, or 4.
- Add the "Complex Case" warning for users who trigger specific flags.
- **Runnable State:** The wizard finishes and categorizes the user's tax filing complexity.

## Phase 12: Comparison & Recommendation Screen
**Goal:** The final "Product Moment."
- Build the side-by-side comparison table (PRD section 12.2).
- Implement the "Personalized Education" text (e.g., "New regime is better because...").
- Add the "Suggestions" section for tax-saving actions.
- Implement a "Download PDF" placeholder.
- **Runnable State:** A complete, end-to-end flow from Landing to Recommendation.

---

## Post-V1 Ideas (Optional)
- Actual PDF Generation using a library.
- "Save Session" using LocalStorage.
- Comparison with previous FY (2024-25).
