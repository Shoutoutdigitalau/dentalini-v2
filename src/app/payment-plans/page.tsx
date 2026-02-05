import ConditionItem from "@/components/ConditionItem";
import InfoSection from "@/components/InfoSection";
import SubHeader from "@/components/layout/SubHeader";
import PaymentOptionCard from "@/components/PaymentOptionCard";
import {
  CreditCard,
  Shield,
  PiggyBank,
  Wallet,
  CheckCircle,
} from "lucide-react";

export default function PaymentPlans() {
  return (
    <div>
      <SubHeader
        title="Payment Plans & Pricing"
        description="Flexible payment options to make your dental care affordable and accessible."
      />

      <section className="container mx-auto px-4 md:px-6 py-8 md:py-20 lg:py-28">
        {/* Payment methods strip */}
        <div
          className="flex flex-wrap justify-center gap-2 md:gap-3 mb-8 md:mb-20"
        >
          {[
            {
              icon: <CreditCard className="w-3 h-3 md:w-4 md:h-4" />,
              text: "Credit & Debit Cards",
            },
            { icon: <Wallet className="w-3 h-3 md:w-4 md:h-4" />, text: "EFTPOS" },
            { icon: <PiggyBank className="w-3 h-3 md:w-4 md:h-4" />, text: "Payment Plans" },
            { icon: <Shield className="w-3 h-3 md:w-4 md:h-4" />, text: "Insurance Claims" },
          ].map((item, index) => (
            <div
              key={index}
              className="inline-flex items-center gap-2 md:gap-2.5 px-3 md:px-5 py-2 md:py-2.5 rounded-full bg-card border border-border/50 shadow-sm text-xs md:text-sm font-medium text-foreground hover:border-secondary/30 hover:shadow-elegant transition-all duration-300"
            >
              <span className="text-secondary">{item.icon}</span>
              <span className="hidden sm:inline">{item.text}</span>
              <span className="sm:hidden">{item.text.split(' ')[0]}</span>
            </div>
          ))}
        </div>

        <div className="grid gap-6 md:gap-8 lg:grid-cols-2">
          {/* Self Payment / Health Insurance */}
          <PaymentOptionCard
            icon={<CreditCard className="w-5 h-5 md:w-6 md:h-6" />}
            title="Self Payment / Health Insurance"
            delay={0.4}
          >
            <InfoSection title="Direct Payment">
              <p className="text-sm md:text-[15px]">
                Pay the full treatment cost upfront. We accept all major payment cards, credit
                and debit cards, EFTPOS, and bank transfers for your
                convenience.
              </p>
            </InfoSection>

            <div className="w-full h-px bg-border/60" />

            <InfoSection title="Health Insurance Coverage">
              <p className="mb-3 text-sm md:text-[15px]">
                Your dental health insurance may cover part of your treatment
                fees. Please check with your insurer on the benefits schedule
                and amount of rebate.
              </p>
              <p className="text-sm md:text-[15px]">
                A treatment plan estimate will be provided prior to treatment,
                including item codes and costs. Present this to your insurer to
                estimate your rebate.
              </p>
            </InfoSection>

            <div className="flex items-center gap-2 pt-2 text-xs md:text-sm text-secondary font-medium">
              <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
              HICAPS available for instant claims
            </div>
          </PaymentOptionCard>

          {/* Payment Plans */}
          <PaymentOptionCard
            icon={<PiggyBank className="w-5 h-5 md:w-6 md:h-6" />}
            title="Payment Plans"
            featured
            delay={0.5}
          >
            <p className="text-muted-foreground text-sm md:text-[15px] leading-relaxed">
              Payment plans allow you to have a loan agreement with a 3rd party,
              enabling gradual repayment without waiting to get treatment
              started.
            </p>

            <p className="text-muted-foreground text-sm md:text-[15px] leading-relaxed">
              We can guide you through your treatment options, including our
              payment plan offerings. Depending on your choice of lender, there
              could be interest-free or standard interest terms.
            </p>

            <div className="p-4 md:p-5 rounded-xl bg-teal-light border border-secondary/10">
              <p className="text-xs md:text-sm text-foreground leading-relaxed">
                <span className="font-semibold">Quick & Easy Approval</span> —
                All approvals are subject to credit checks. Terms and conditions
                vary based on your treatment plan and chosen lender.
              </p>
            </div>
          </PaymentOptionCard>
        </div>

        {/* Compassionate Early Release of Superannuation */}
        <PaymentOptionCard
          icon={<Shield className="w-5 h-5 md:w-6 md:h-6" />}
          title="Compassionate Early Release of Superannuation"
          className="mt-6 md:mt-8"
          delay={0.6}
        >
          <div className="grid gap-6 md:gap-10 lg:grid-cols-2">
            <div className="space-y-4 md:space-y-6">
              <p className="text-muted-foreground text-sm md:text-[15px] leading-relaxed">
                There are limited circumstances where you can access your super
                on compassionate grounds to meet expenses for you or your
                dependant.
              </p>

              <InfoSection title="Eligible Expenses">
                <p className="text-sm md:text-[15px]">
                  You may be able to have super released to meet expenses for
                  medical treatment. Applications generally need to be for an
                  unpaid expense.
                </p>
              </InfoSection>

              <InfoSection title="Tax Implications">
                <p className="text-sm md:text-[15px]">
                  Super withdrawn on compassionate grounds is taxed as a normal
                  super lump sum. The tax rate depends on your age, preservation
                  age, and the components of the lump sum.
                </p>
              </InfoSection>
            </div>

            <div>
              <h4 className="font-display font-semibold text-sm md:text-base text-foreground mb-4 md:mb-5 tracking-tight">
                Eligibility Conditions
              </h4>
              <div className="space-y-3 md:space-y-4">
                <ConditionItem number={1}>
                  You are or have been a citizen or permanent resident of
                  Australia or New Zealand.
                </ConditionItem>

                <ConditionItem number={2}>
                  You meet the eligibility requirements of the specific
                  compassionate grounds you're applying for.
                </ConditionItem>

                <ConditionItem number={3}>
                  Your expense is unpaid or was paid by borrowed money that
                  remains outstanding.
                </ConditionItem>

                <ConditionItem number={4}>
                  You can't afford to pay the expense without accessing your
                  super (using savings, mortgage redraw, selling assets, or
                  borrowing).
                </ConditionItem>

                <ConditionItem number={5}>
                  You provide all required supporting evidence, invoices or
                  quotes, including documentation for dependant relationships.
                </ConditionItem>
              </div>
            </div>
          </div>
        </PaymentOptionCard>
      </section>
    </div>
  );
}
