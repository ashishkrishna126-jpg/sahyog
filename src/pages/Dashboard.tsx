import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/common/LanguageSwitcher';
import RedRibbon from '../components/common/RedRibbon';

const YEAR_LABELS = [
  '2020-21',
  '2021-22',
  '2022-23',
  '2023-24',
  '2024-25',
  'Apr - September 2025',
] as const;

type YearLabel = (typeof YEAR_LABELS)[number];

interface DistrictReport {
  district: string;
  cases: Record<YearLabel, number>;
}

const DISTRICT_REPORTS: DistrictReport[] = [
  { district: 'Alappuzha', cases: { '2020-21': 40, '2021-22': 21, '2022-23': 59, '2023-24': 58, '2024-25': 43, 'Apr - September 2025': 24 } },
  { district: 'Ernakulam', cases: { '2020-21': 87, '2021-22': 106, '2022-23': 217, '2023-24': 241, '2024-25': 232, 'Apr - September 2025': 137 } },
  { district: 'Idukki', cases: { '2020-21': 8, '2021-22': 21, '2022-23': 36, '2023-24': 41, '2024-25': 41, 'Apr - September 2025': 32 } },
  { district: 'Kannur', cases: { '2020-21': 73, '2021-22': 56, '2022-23': 60, '2023-24': 73, '2024-25': 62, 'Apr - September 2025': 43 } },
  { district: 'Kasaragod', cases: { '2020-21': 26, '2021-22': 22, '2022-23': 42, '2023-24': 38, '2024-25': 33, 'Apr - September 2025': 19 } },
  { district: 'Kollam', cases: { '2020-21': 34, '2021-22': 55, '2022-23': 54, '2023-24': 59, '2024-25': 71, 'Apr - September 2025': 34 } },
  { district: 'Kottayam', cases: { '2020-21': 75, '2021-22': 90, '2022-23': 95, '2023-24': 116, '2024-25': 91, 'Apr - September 2025': 42 } },
  { district: 'Kozhikode', cases: { '2020-21': 96, '2021-22': 122, '2022-23': 106, '2023-24': 139, '2024-25': 118, 'Apr - September 2025': 72 } },
  { district: 'Malappuram', cases: { '2020-21': 17, '2021-22': 36, '2022-23': 47, '2023-24': 52, '2024-25': 68, 'Apr - September 2025': 36 } },
  { district: 'Palakkad', cases: { '2020-21': 82, '2021-22': 106, '2022-23': 86, '2023-24': 104, '2024-25': 98, 'Apr - September 2025': 77 } },
  { district: 'Pathanamthitta', cases: { '2020-21': 14, '2021-22': 22, '2022-23': 35, '2023-24': 26, '2024-25': 51, 'Apr - September 2025': 45 } },
  { district: 'Thiruvananthapuram', cases: { '2020-21': 94, '2021-22': 116, '2022-23': 162, '2023-24': 150, '2024-25': 161, 'Apr - September 2025': 68 } },
  { district: 'Thrissur', cases: { '2020-21': 130, '2021-22': 132, '2022-23': 164, '2023-24': 148, '2024-25': 128, 'Apr - September 2025': 67 } },
  { district: 'Wayanad', cases: { '2020-21': 11, '2021-22': 16, '2022-23': 20, '2023-24': 18, '2024-25': 16, 'Apr - September 2025': 7 } },
];

const SPARK_SHORT_LABELS: Record<YearLabel, string> = {
  '2020-21': '20-21',
  '2021-22': '21-22',
  '2022-23': '22-23',
  '2023-24': '23-24',
  '2024-25': '24-25',
  'Apr - September 2025': 'Apr-Sep',
};

const numberFormat = new Intl.NumberFormat('en-IN');

export default function Dashboard() {
  const { t } = useTranslation();
  const yearTotals = YEAR_LABELS.map((year) =>
    DISTRICT_REPORTS.reduce((sum, district) => sum + district.cases[year], 0)
  );

  const lastFullYearIndex = YEAR_LABELS.indexOf('2024-25');
  const halfYearIndex = YEAR_LABELS.indexOf('Apr - September 2025');
  const totalLastFullYear = lastFullYearIndex >= 0 ? yearTotals[lastFullYearIndex] : 0;
  const totalHalfYear = halfYearIndex >= 0 ? yearTotals[halfYearIndex] : 0;
  const maxYearTotal = Math.max(1, ...yearTotals);
  const maxCaseValue = Math.max(
    1,
    ...DISTRICT_REPORTS.flatMap((report) => YEAR_LABELS.map((year) => report.cases[year]))
  );

  const topDistrict2024 = DISTRICT_REPORTS.reduce((prev, current) =>
    current.cases['2024-25'] > prev.cases['2024-25'] ? current : prev
  );

  const biggestGrowthDistrict = DISTRICT_REPORTS.reduce((prev, current) => {
    const prevGrowth = prev.cases['2024-25'] - prev.cases['2020-21'];
    const currentGrowth = current.cases['2024-25'] - current.cases['2020-21'];
    return currentGrowth > prevGrowth ? current : prev;
  });

  const halfYearShare = totalHalfYear && totalLastFullYear ? ((totalHalfYear / totalLastFullYear) * 100).toFixed(1) : '0.0';
  const topDistrictShare = totalLastFullYear
    ? ((topDistrict2024.cases['2024-25'] / totalLastFullYear) * 100).toFixed(1)
    : '0.0';
  const growthValue = biggestGrowthDistrict.cases['2024-25'] - biggestGrowthDistrict.cases['2020-21'];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 -left-24 w-96 h-96 bg-primary-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -right-16 w-[640px] h-[640px] bg-gold-100/60 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10">
        <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/90 backdrop-blur-xl shadow-sm">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <RedRibbon size="sm" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary-600">SAHYOG</p>
                <h1 className="text-lg font-bold text-slate-900">{t('dashboard.title', 'Kerala ICTC Dashboard')}</h1>
              </div>
            </div>
            <LanguageSwitcher />
          </div>
        </header>

        <main className="pb-16">
          <section className="container mx-auto px-6 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl"
            >
              <h2 className="text-4xl sm:text-5xl font-black text-slate-900 leading-tight">
                {t('dashboard.heroHeadline', 'District-level HIV case tracker')}
              </h2>
              <p className="mt-4 text-lg text-slate-600 leading-relaxed">
                {t(
                  'dashboard.heroCopy',
                  'Integrated Counselling and Testing Centres report quarterly positives from every district. Follow the trend to understand where resources and awareness are needed most.'
                )}
              </p>
            </motion.div>
          </section>

          <section className="container mx-auto px-6 pt-10">
            <div className="grid gap-6 md:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-primary-900/10"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-primary-600 font-semibold">2024-25</p>
                <p className="text-3xl font-black text-slate-900 mt-3">
                  {numberFormat.format(totalLastFullYear)}
                </p>
                <p className="text-sm text-slate-500 mt-1">new positives reported across Kerala ICTCs</p>
                <div className="mt-6 grid grid-cols-6 gap-2">
                  {YEAR_LABELS.map((year, index) => (
                    <div key={year} className="h-16 flex flex-col items-center justify-end text-[0.58rem] text-slate-500">
                      <span className="leading-none">{SPARK_SHORT_LABELS[year]}</span>
                      <div className="mt-1 h-3 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-t from-primary-500 to-primary-400"
                          style={{ height: `${(yearTotals[index] / maxYearTotal) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-primary-900/5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-600 font-semibold">Apr - Sep 2025</p>
                <p className="text-3xl font-black text-slate-900 mt-3">{numberFormat.format(totalHalfYear)}</p>
                <p className="text-sm text-slate-500 mt-1">
                  ≈ {halfYearShare}% of the 2024-25 total reported in the first six months
                </p>
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Note</p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    Reporting window shortened for financial half-year. Trends help plan outreach and testing drives.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-xl shadow-primary-900/5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-600 font-semibold">Top district</p>
                <p className="text-3xl font-black text-slate-900 mt-3">{topDistrict2024.district}</p>
                <p className="text-sm text-slate-600 mt-1">
                  {numberFormat.format(topDistrict2024.cases['2024-25'])} cases in 2024-25 ({topDistrictShare}% of the state total)
                </p>
                <p className="text-sm text-slate-500 mt-4">
                  Biggest increase since 2020-21: {biggestGrowthDistrict.district} added {numberFormat.format(growthValue)} more cases to the tally.
                </p>
              </motion.div>
            </div>
          </section>

          <section className="container mx-auto px-6 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="overflow-x-auto rounded-3xl border border-slate-100 bg-white shadow-xl shadow-primary-900/5"
            >
              <table className="min-w-full border-collapse">
                <thead className="text-left text-xs uppercase tracking-[0.3em] text-slate-500">
                  <tr>
                    <th className="px-6 py-4">District</th>
                    {YEAR_LABELS.map((year) => (
                      <th key={year} className="px-4 py-4 text-center">
                        {year}
                      </th>
                    ))}
                    <th className="px-6 py-4">Trend</th>
                  </tr>
                </thead>
                <tbody>
                  {DISTRICT_REPORTS.map((report, idx) => {
                    const latestValue = report.cases['2024-25'];
                    const delta = latestValue - report.cases['2020-21'];
                    return (
                      <tr key={report.district} className={`border-t ${idx % 2 === 0 ? 'bg-slate-50/40' : ''}`}>
                        <td className="px-6 py-4 text-slate-700 font-semibold">{report.district}</td>
                        {YEAR_LABELS.map((year) => (
                          <td key={year} className="px-4 py-4 text-center text-slate-600 font-medium">
                            {report.cases[year]}
                          </td>
                        ))}
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <div className="h-1.5 w-full rounded-full bg-slate-100">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
                                style={{ width: `${(latestValue / maxCaseValue) * 100}%` }}
                              />
                            </div>
                            <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                              {delta >= 0 ? '+' : ''}
                              {delta}
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr className="border-t text-sm font-semibold text-slate-800 bg-slate-100">
                    <td className="px-6 py-3">Kerala total</td>
                    {YEAR_LABELS.map((year, index) => (
                      <td key={year} className="px-4 py-3 text-center">
                        {numberFormat.format(yearTotals[index])}
                      </td>
                    ))}
                    <td className="px-6 py-3" />
                  </tr>
                </tfoot>
              </table>
            </motion.div>
            <p className="mt-4 text-xs text-slate-500">
              Data source: Integrated Counselling and Testing Centres (ICTCs), Kerala. A case reported in a district does not imply native residency.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
}