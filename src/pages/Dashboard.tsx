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
  const previousYearTotal = lastFullYearIndex > 0 ? yearTotals[lastFullYearIndex - 1] : 0;
  const yearOverYearChange =
    previousYearTotal > 0
      ? (((totalLastFullYear - previousYearTotal) / previousYearTotal) * 100).toFixed(1)
      : '0.0';
  const yearOverYearChangeNumber = parseFloat(yearOverYearChange);

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
          <section className="container mx-auto px-6 py-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="relative max-w-6xl rounded-3xl bg-gradient-to-br from-slate-900 via-primary-900 to-rose-800 p-8 shadow-[0_35px_80px_rgba(15,23,42,0.45)] text-white overflow-hidden"
            >
              <div className="absolute inset-0 opacity-40">
                <div className="absolute -top-16 -right-10 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                <div className="absolute -bottom-20 left-0 h-80 w-80 rounded-full bg-gold-200/30 blur-[120px]" />
              </div>
              <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/80 font-semibold">
                    <span>Kerala ICTC</span>
                    <span className="text-primary-200">Live Snapshot</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black leading-tight">
                    {t('dashboard.heroHeadline', 'District-level HIV case tracker')}
                  </h2>
                  <p className="text-lg text-white/80 leading-relaxed max-w-2xl">
                    {t(
                      'dashboard.heroCopy',
                      'Integrated Counselling and Testing Centres report quarterly positives from every district. Follow the trend to understand where resources and awareness are needed most.'
                    )}
                  </p>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">2024-25 Total</p>
                      <p className="text-3xl font-black mt-2">{numberFormat.format(totalLastFullYear)}</p>
                      <p className="text-sm text-white/80 mt-1">Annual positives across ICTCs</p>
                    </div>
                    <div className="rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur-sm">
                      <p className="text-xs uppercase tracking-[0.3em] text-white/70">Apr - Sep 2025</p>
                      <p className="text-3xl font-black mt-2">{numberFormat.format(totalHalfYear)}</p>
                      <p className="text-sm text-white/80 mt-1">{halfYearShare}% of 2024-25 total in six months</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-5 rounded-3xl border border-white/20 bg-white/10 p-6 backdrop-blur-lg shadow-lg">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">Spotlight district</p>
                    <h3 className="text-3xl font-black">{topDistrict2024.district}</h3>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {numberFormat.format(topDistrict2024.cases['2024-25'])} cases in 2024-25 ({topDistrictShare}% of the state total) and still growing.
                  </p>
                  <div className="grid gap-3">
                    <div className="flex items-center justify-between rounded-2xl bg-white/20 px-4 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/60">Largest SE growth</p>
                      <span className="font-semibold text-white">{biggestGrowthDistrict.district}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl bg-gradient-to-r from-primary-500/40 to-rose-500/40 px-4 py-3">
                      <p className="text-[0.6rem] uppercase tracking-[0.3em] text-white/60">Growth since 2020-21</p>
                      <span className="font-black text-white">{numberFormat.format(growthValue)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-white/80">
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span>Data refreshed quarterly</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          <section className="container mx-auto px-6 pt-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-primary-900/5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-primary-600 font-semibold">Momentum</p>
                <div className="mt-3 flex items-center gap-3">
                  <p className="text-4xl font-black text-slate-900">{halfYearShare}%</p>
                  <p className="text-sm text-slate-500">of last year in six months</p>
                </div>
                <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                  Steady reporting in the first half of FY 2025 signals early momentum for outreach and testing drives.
                </p>
                <div className="mt-6 grid grid-cols-3 gap-2 text-[0.55rem]">
                  {YEAR_LABELS.slice(-3).map((year) => (
                    <div key={year} className="flex flex-col items-center gap-1">
                      <span className="text-slate-400">{SPARK_SHORT_LABELS[year]}</span>
                      <span className="w-full rounded-full bg-slate-100">
                        <span
                          className="block h-1 rounded-full bg-gradient-to-r from-primary-500 to-rose-500"
                          style={{ width: `${(yearTotals[YEAR_LABELS.indexOf(year)] / maxYearTotal) * 100}%` }}
                        />
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-primary-900/5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500 font-semibold">Year-on-year</p>
                <p className="text-4xl font-black mt-3 text-slate-900">
                  {yearOverYearChange}%
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  {yearOverYearChangeNumber >= 0 ? 'Growth since 2023-24' : 'Drop compared to 2023-24'}
                </p>
                <div className="mt-6 h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${yearOverYearChangeNumber >= 0 ? 'bg-emerald-400' : 'bg-rose-400'}`}
                    style={{ width: `${Math.min(Math.abs(yearOverYearChangeNumber), 100)}%` }}
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-lg shadow-primary-900/5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-primary-600 font-semibold">Fastest growth</p>
                <h3 className="text-3xl font-black text-slate-900 mt-3">{biggestGrowthDistrict.district}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mt-2">
                  Added {numberFormat.format(growthValue)} more cases versus 2020-21, the steepest jump recorded.
                </p>
                <div className="mt-6 flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-slate-500">Share</span>
                  <span className="text-lg font-bold text-slate-900">{topDistrictShare}%</span>
                </div>
              </motion.div>
            </div>
          </section>

          <section className="container mx-auto px-6 pt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white/90 shadow-2xl shadow-primary-900/10"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse text-sm">
                  <thead className="bg-white/80 text-left text-[0.65rem] uppercase tracking-[0.3em] text-slate-500">
                    <tr>
                      <th className="px-6 py-4">District</th>
                      {YEAR_LABELS.map((year) => (
                        <th key={year} className="px-4 py-4 text-center md:text-[0.7rem]">
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
                      const isTop = report.district === topDistrict2024.district;
                      const isGrowth = report.district === biggestGrowthDistrict.district;
                      const deltaLabel = `${delta >= 0 ? '+' : ''}${delta}`;
                      const deltaBadge = delta >= 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700';
                      return (
                        <tr
                          key={report.district}
                          className={`border-t transition-colors ${idx % 2 === 0 ? 'bg-slate-50/40' : 'bg-white'} hover:bg-slate-100/80`}
                        >
                          <td className="px-6 py-4 text-slate-700 font-semibold">
                            <div className="flex flex-wrap items-center gap-2">
                              <span>{report.district}</span>
                              {isTop && (
                                <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                                  Top
                                </span>
                              )}
                              {isGrowth && (
                                <span className="rounded-full bg-rose-100 px-2 py-0.5 text-[0.55rem] font-semibold uppercase tracking-[0.2em] text-rose-700">
                                  Growth
                                </span>
                              )}
                            </div>
                          </td>
                          {YEAR_LABELS.map((year) => (
                            <td key={year} className="px-4 py-4 text-center text-slate-600 font-medium">
                              {report.cases[year]}
                            </td>
                          ))}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="h-1.5 rounded-full bg-slate-100">
                                  <div
                                    className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-400"
                                    style={{ width: `${(latestValue / maxCaseValue) * 100}%` }}
                                  />
                                </div>
                              </div>
                              <span className={`text-[0.65rem] font-semibold uppercase tracking-[0.3em] ${deltaBadge} px-2 py-0.5 rounded-full`}>
                                {deltaLabel}
                              </span>
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
                        <td key={year} className="px-4 py-3 text-center text-slate-800">
                          {numberFormat.format(yearTotals[index])}
                        </td>
                      ))}
                      <td className="px-6 py-3" />
                    </tr>
                  </tfoot>
                </table>
              </div>
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