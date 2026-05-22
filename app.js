/**
 * ThaiTax Pro - Core Javascript Engine
 * Contains:
 * 1. Bilingual Dictionary (TH/EN)
 * 2. Progressive Tax Engine & Limits Cap Validation
 * 3. Event Listeners & Wizard Navigation
 * 4. Real-time DOM Updates & Dynamic SVG Donut Chart
 * 5. Smart Tax Advisor (Calculates exact potential savings)
 * 6. Print Report Generator
 */

// ==========================================================================
// 1. Translations Dictionary
// ==========================================================================
const translations = {
    th: {
        "app-title": "ThaiTax Pro | โปรแกรมคำนวณภาษีเงินได้บุคคลธรรมดา",
        "step-income": "รายได้",
        "step-family": "ลดหย่อนครอบครัว",
        "step-insurance": "ประกัน",
        "step-savings": "กองทุนออมเงิน",
        "step-donations": "บริจาค/อื่นๆ",
        "income-title": "ข้อมูลรายได้ต่อปี",
        "income-desc": "ระบุเงินเดือน โบนัส และรายได้ประเภทอื่นๆ เพื่อใช้เป็นฐานในการคำนวณภาษี",
        "salary-label": "เงินเดือนเฉลี่ย (บาท / เดือน)",
        "salary-help": "เงินได้พึงประเมินมาตรา 40(1) เช่น เงินเดือน ค่าจ้าง",
        "bonus-label": "โบนัสต่อปี (บาท)",
        "other-income-label": "รายได้อื่นๆ ต่อปี (บาท)",
        "total-gross-income": "รวมรายได้พึงประเมินทั้งปี:",
        "deductible-expenses": "หักค่าใช้จ่ายส่วนตัว (50% ไม่เกิน 100,000 บาท):",
        "family-title": "ลดหย่อนส่วนตัวและครอบครัว",
        "family-desc": "กรอกข้อมูลผู้ติดตามและครอบครัวเพื่อใช้สิทธิ์ลดหย่อนภาษี",
        "personal-allowance-title": "ลดหย่อนส่วนตัว (ทุกคนได้รับสิทธิ์นี้)",
        "personal-allowance-desc": "สิทธิ์หักลดหย่อนสำหรับผู้มีเงินได้",
        "spouse-allowance-title": "คู่สมรส (ไม่มีรายได้)",
        "spouse-allowance-desc": "จดทะเบียนสมรส และคู่สมรสไม่มีเงินได้ในปีภาษีนี้",
        "child-label": "จำนวนบุตร (คน)",
        "child-help": "หักลดหย่อนคนละ 30,000 บาท",
        "child2561-label": "จำนวนบุตรคนที่ 2 ขึ้นไป เกิดปี 2561 เป็นต้นไป (คน)",
        "child2561-help": "จะได้สิทธิ์ลดหย่อนเพิ่มเติมเป็นคนละ 60,000 บาท",
        "parents-label": "จำนวนบิดามารดาที่ดูแล (คน)",
        "parents-help": "อายุ 60 ปีขึ้นไป รายได้ไม่เกิน 30,000 บาท/ปี (สูงสุด 4 คน คนละ 30,000)",
        "disabled-label": "จำนวนผู้พิการ/ทุพพลภาพที่ดูแล (คน)",
        "disabled-help": "มีบัตรประจำตัวผู้พิการ และเราเป็นผู้อุปการะ คนละ 60,000 บาท",
        "insurance-title": "เบี้ยประกันชีวิตและสุขภาพ",
        "insurance-desc": "ประกันลดหย่อนภาษีทั่วไป ช่วยสร้างความมั่นคงพร้อมประหยัดภาษี",
        "social-sec-label": "เงินประกันสังคมต่อปี (บาท)",
        "social-sec-help": "ลดหย่อนได้ตามจริง สูงสุด 9,000 บาท/ปี",
        "auto-fill": "คำนวณอัตโนมัติ",
        "life-ins-label": "เบี้ยประกันชีวิตทั่วไป (บาท)",
        "life-ins-help": "ประกันที่มีอายุกรมธรรม์ 10 ปีขึ้นไป",
        "health-ins-label": "เบี้ยประกันสุขภาพตัวเอง (บาท)",
        "health-ins-help": "สูงสุดไม่เกิน 25,000 บาท และรวมกับประกันชีวิตทั่วไปไม่เกิน 100,000 บาท",
        "parent-health-ins-label": "เบี้ยประกันสุขภาพบิดามารดา (บาท)",
        "parent-health-ins-help": "ประกันสุขภาพของคุณพ่อคุณแม่ ลดหย่อนตามจริงสูงสุด 15,000 บาท",
        "savings-title": "กองทุนและการออมเพื่อเกษียณ",
        "savings-desc": "ลดหย่อนกลุ่มเกษียณอายุการออม",
        "savings-cap-warning": "(ทุกรายการในหน้านี้รวมกันต้องไม่เกิน 500,000 บาท)",
        "pvd-label": "กองทุนสำรองเลี้ยงชีพ / กบข. (บาท)",
        "pvd-help": "หักได้สูงสุด 15% ของรายได้เฉพาะมาตรา 40(1)",
        "pension-ins-label": "เบี้ยประกันชีวิตแบบบำนาญ (บาท)",
        "pension-ins-help": "สูงสุด 15% ของเงินได้ ไม่เกิน 200,000 บาท",
        "rmf-label": "กองทุนรวมเพื่อการเลี้ยงชีพ (RMF) (บาท)",
        "rmf-help": "ซื้อได้สูงสุด 30% ของเงินได้พึงประเมิน",
        "ssf-label": "กองทุนรวมเพื่อการออม (SSF) (บาท)",
        "ssf-help": "ซื้อได้สูงสุด 30% ของเงินได้พึงประเมิน ไม่เกิน 200,000 บาท",
        "nsf-label": "กองทุนการออมแห่งชาติ (กอช.) (บาท)",
        "nsf-help": "สำหรับผู้ประกอบอาชีพอิสระ สูงสุด 30,000 บาท/ปี",
        "donations-title": "กองทุนพิเศษ ดอกเบี้ยบ้าน และเงินบริจาค",
        "donations-desc": "สิทธิ์การลงทุนสีเขียว ดอกเบี้ยกู้ซื้อบ้าน และการสนับสนุนบริจาคสังคม",
        "esg-label": "กองทุน Thailand ESG Fund (Thai ESG) (บาท)",
        "esg-help": "ซื้อได้สูงสุด 30% ของรายได้ ไม่เกิน 300,000 บาท (***สิทธิ์แยกส่วนตัวไม่รวมอยู่ในกลุ่ม 500k)",
        "home-loan-label": "ดอกเบี้ยเงินกู้ซื้อที่อยู่อาศัย (บาท)",
        "home-loan-help": "หักตามจริง สูงสุดไม่เกิน 100,000 บาท",
        "shopping-label": "มาตรการกระตุ้นเศรษฐกิจของรัฐ / อื่นๆ (บาท)",
        "shopping-help": "เช่น Easy E-Receipt หรือตามสิทธิ์อื่นๆ ตามกฎหมายรัฐ (สูงสุด 50,000 บาท)",
        "donation2x-label": "บริจาคสนับสนุนการศึกษา/โรงพยาบาลรัฐ (2 เท่า) (บาท)",
        "donation2x-help": "คิดสิทธิ์ลดหย่อนให้ 2 เท่าของที่จ่ายจริง (สูงสุดไม่เกิน 10% ของเงินสุทธิหลังหักลดหย่อนอื่น)",
        "donation-norm-label": "เงินบริจาคทั่วไป (วัด/สมาคม/มูลนิธิ) (บาท)",
        "donation-norm-help": "ลดหย่อนได้ตามจริงสูงสุด 10% ของเงินสุทธิหลังหักลดหย่อนอื่น",
        "btn-prev": "ย้อนกลับ",
        "btn-clear": "ล้างข้อมูลทั้งหมด",
        "btn-next": "ถัดไป",
        "tax-payable-title": "ภาษีที่คุณต้องจ่าย",
        "net-income-lbl": "เงินได้สุทธิ",
        "marginal-rate-lbl": "อัตราภาษีสูงสุด",
        "effective-rate-lbl": "อัตราภาษีเฉลี่ย (Effective Tax Rate): ",
        "tax-breakdown-chart": "กราฟแสดงโครงสร้างรายได้",
        "total-gross-lbl": "รายได้ทั้งหมด",
        "legend-net": "เงินสุทธิคงเหลือหลังภาษี",
        "legend-expenses": "ค่าใช้จ่ายส่วนตัว",
        "legend-deductions": "ค่าลดหย่อนต่างๆ",
        "legend-tax": "ภาษีที่ต้องจ่าย",
        "tax-brackets-title": "ตารางคำนวณแบบขั้นบันได",
        "advisor-title": "ข้อแนะนำประหยัดภาษีอัจฉริยะ",
        "btn-print": "พิมพ์/พิมพ์สรุปรายงานเป็น PDF",
        "modal-guide-title": "คู่มือสิทธิลดหย่อนภาษี ปีภาษี 2568",
        "modal-close": "ตกลง, เข้าใจแล้ว",
        
        // Dynamic strings
        "baht": "บาท",
        "exempt": "ได้รับยกเว้น",
        "bracket-info": "เงินสุทธิส่วนที่ {from} - {to}",
        "bracket-over": "เงินสุทธิส่วนที่เกิน {from}",
        "bracket-spent": "มีเงินได้ในขั้นนี้ {amount} บาท",
        "bracket-unused": "ไม่มีรายได้ในขั้นนี้",
        "advisor-no-tips": "ยินดีด้วย! คุณวางแผนภาษีได้อย่างดีเยี่ยมหรือรายได้สุทธิของคุณได้รับการยกเว้นภาษีแล้ว จึงยังไม่มีคำแนะนำเพิ่มเติมในขณะนี้",
        "tip-esg": "ซื้อกองทุน <strong>Thai ESG</strong> เพิ่มได้อีก <strong>{amount} บาท</strong> ซึ่งจะช่วยประหยัดภาษีเพิ่มขึ้นได้ถึง <strong>{saving} บาท!</strong>",
        "tip-retirement": "ลงทุนในกองทุนลดหย่อนเกษียณรวม (<strong>SSF / RMF / ประกันบำนาญ</strong>) เพิ่มได้อีก <strong>{amount} บาท</strong> ช่วยเซฟภาษีเพิ่มได้ <strong>{saving} บาท!</strong>",
        "tip-life-ins": "ซื้อเบี้ย<strong>ประกันชีวิตทั่วไป / ประกันสุขภาพ</strong>เพิ่มได้อีก <strong>{amount} บาท</strong> เพื่อรับสิทธิ์ลดหย่อนเต็มเพดาน ช่วยประหยัดภาษี <strong>{saving} บาท!</strong>",
        "cap-warning": "วงเงินลดหย่อนกลุ่มเกษียณรวมของท่านเกินกฎหมายกำหนดที่ 500,000 บาท ระบบหักลดหย่อนให้สูงสุดที่ 500,000 บาทถ้วน",
        
        // Guide
        "guide-h1": "1. เงินได้พึงประเมินและค่าใช้จ่าย",
        "guide-p1": "เงินเดือน โบนัส และรายได้จากงานประจำ (ประเภท 40(1)) สามารถเลือกหักค่าใช้จ่ายเป็นการเหมาได้ 50% แต่สูงสุดไม่เกิน 100,000 บาท",
        "guide-h2": "2. กลุ่มค่าลดหย่อนส่วนตัวและครอบครัว",
        "guide-li2-1": "ผู้มีเงินได้: หักลดหย่อนส่วนตัวได้ทันที 60,000 บาท",
        "guide-li2-2": "คู่สมรส: ลดหย่อนได้ 60,000 บาท (ต้องจดทะเบียนสมรสและคู่สมรสไม่มีรายได้)",
        "guide-li2-3": "บุตร: คนละ 30,000 บาท บุตรคนที่ 2 ขึ้นไปที่เกิดตั้งแต่ปี 2561 จะได้ 60,000 บาท",
        "guide-li2-4": "พ่อ/แม่: คนละ 30,000 บาท ต้องอายุ 60 ปีขึ้นไปและมีเงินได้ไม่เกิน 30,000 บาทต่อปี (ได้สูงสุด 4 คนรวมของคู่สมรส)",
        "guide-h3": "3. ประกันชีวิตและสุขภาพ",
        "guide-li3-1": "ประกันชีวิตทั่วไป: หักลดหย่อนตามที่จ่ายจริงสูงสุด 100,000 บาท",
        "guide-li3-2": "ประกันสุขภาพตัวเอง: ตามจริงสูงสุด 25,000 บาท (แต่รวมกับประกันชีวิตทั่วไปแล้วต้องไม่เกิน 100,000 บาท)",
        "guide-li3-3": "ประกันสุขภาพบิดามารดา: ตามจริงสูงสุด 15,000 บาท (พ่อแม่ต้องมีรายได้ไม่เกิน 30,000 บาทต่อปี)",
        "guide-h4": "4. กองทุนกลุ่มเพื่อการออมและบำนาญ (สิทธิ์รวมกันไม่เกิน 500,000 บาท)",
        "guide-li4-1": "PVD (สำรองเลี้ยงชีพ) / กบข.: หักได้ตามจริงสูงสุด 15% ของเงินได้ ไม่เกิน 500,000 บาท",
        "guide-li4-2": "RMF (กองทุนเลี้ยงชีพ): ซื้อได้สูงสุด 30% ของรายได้ ไม่เกิน 500,000 บาท",
        "guide-li4-3": "SSF (กองทุนเพื่อการออม): ซื้อได้สูงสุด 30% ของรายได้ ไม่เกิน 200,000 บาท",
        "guide-li4-4": "ประกันชีวิตแบบบำนาญ: ลดหย่อนได้ 15% ของรายได้ ไม่เกิน 200,000 บาท",
        "guide-h5": "5. สิทธิประโยชน์พิเศษเพิ่มเติม",
        "guide-li5-1": "Thai ESG (กองทุนรักษ์โลก): ซื้อเพื่อลดหย่อนภาษีได้สูงสุด 30% ของเงินได้ ไม่เกิน 300,000 บาท โดยวงเงินลดหย่อนส่วนนี้จะแยกอิสระ **ไม่ถูกนำไปนับรวมในเพดาน 500,000 บาท** ของกองทุนกลุ่มเกษียณ!",
        "guide-li5-2": "ดอกเบี้ยกู้ซื้อบ้าน: ตามจ่ายจริงสูงสุดไม่เกิน 100,000 บาท",
        "guide-li5-3": "เงินบริจาค 2 เท่า: เช่น บริจาคเพื่อการศึกษา โรงพยาบาลรัฐ หักลดหย่อนได้ 2 เท่าของจำนวนเงินที่บริจาคจริง แต่ต้องไม่เกิน 10% ของเงินได้สุทธิ"
    },
    en: {
        "app-title": "ThaiTax Pro | Thai Personal Income Tax Calculator",
        "step-income": "Income",
        "step-family": "Family Deductions",
        "step-insurance": "Insurance",
        "step-savings": "Retirement Funds",
        "step-donations": "Donations & Other",
        "income-title": "Annual Income Details",
        "income-desc": "Specify salary, bonus, and other annual income to build your tax calculation baseline.",
        "salary-label": "Average Salary (THB / Month)",
        "salary-help": "Taxable income Section 40(1) e.g., salary, monthly wage",
        "bonus-label": "Annual Bonus (THB)",
        "other-income-label": "Other Income per Year (THB)",
        "total-gross-income": "Total Annual Assessable Income:",
        "deductible-expenses": "Deductible Personal Expenses (50% max 100,000 THB):",
        "family-title": "Personal & Family Allowances",
        "family-desc": "Input dependencies and marital status to claim family tax allowances.",
        "personal-allowance-title": "Personal Allowance (Granted to everyone)",
        "personal-allowance-desc": "Automatic tax reduction for the taxpayer",
        "spouse-allowance-title": "Spouse (No Income)",
        "spouse-allowance-desc": "Legally married, and the spouse has no income in this tax year",
        "child-label": "Number of Children (Persons)",
        "child-help": "Deduction of 30,000 THB per child",
        "child2561-label": "2nd Child onwards, born in 2018 or later (Persons)",
        "child2561-help": "Receives an additional deduction of 60,000 THB per child",
        "parents-label": "Elderly Parents under care (Persons)",
        "parents-help": "Age 60+, income < 30k THB/year (Max 4 parents, 30k each)",
        "disabled-label": "Disabled dependents under care (Persons)",
        "disabled-help": "Holds disabled ID card, under taxpayer's support. 60,000 THB each",
        "insurance-title": "Life & Health Insurance Premiums",
        "insurance-desc": "General tax-deductible insurance premiums to secure your future.",
        "social-sec-label": "Social Security Contribution per Year (THB)",
        "social-sec-help": "Actual paid, capped at 9,000 THB/year",
        "auto-fill": "Auto Calculate",
        "life-ins-label": "General Life Insurance Premium (THB)",
        "life-ins-help": "Policies with duration of 10 years or more",
        "health-ins-label": "Personal Health Insurance Premium (THB)",
        "health-ins-help": "Max 25,000 THB. Combined with general life insurance max 100,000 THB",
        "parent-health-ins-label": "Parents' Health Insurance Premium (THB)",
        "parent-health-ins-help": "Health insurance for parents. Actual paid, max 15,000 THB",
        "savings-title": "Savings & Retirement Funds",
        "savings-desc": "Retirement savings allowances",
        "savings-cap-warning": "(All items in this section combined must not exceed 500,000 THB)",
        "pvd-label": "Provident Fund / GPF (THB)",
        "pvd-help": "Up to 15% of Section 40(1) income, capped at 500k THB",
        "pension-ins-label": "Pension Life Insurance Premium (THB)",
        "pension-ins-help": "Up to 15% of income, capped at 200,000 THB",
        "rmf-label": "Retirement Mutual Fund (RMF) (THB)",
        "rmf-help": "Up to 30% of assessable income",
        "ssf-label": "Super Savings Fund (SSF) (THB)",
        "ssf-help": "Up to 30% of assessable income, capped at 200,000 THB",
        "nsf-label": "National Savings Fund (NSF) (THB)",
        "nsf-help": "For self-employed citizens, max 30,000 THB/year",
        "donations-title": "Special Funds, Housing Interest & Donations",
        "donations-desc": "Green investment funds, mortgage interest, and charitable contributions.",
        "esg-label": "Thailand ESG Fund (Thai ESG) (THB)",
        "esg-help": "Up to 30% of income, capped at 300,000 THB (***Independent: NOT included in the 500k cap!)",
        "home-loan-label": "Home Mortgage Loan Interest (THB)",
        "home-loan-help": "Actual paid, capped at 100,000 THB",
        "shopping-label": "Government Shopping Stimulus / Others (THB)",
        "shopping-help": "e.g., Easy E-Receipt or custom tax incentives (usually max 50,000 THB)",
        "donation2x-label": "Education / Public Hospital Donations (2x) (THB)",
        "donation2x-help": "Claim 2 times the actual donation (Max 10% of net income after other deductions)",
        "donation-norm-label": "General Charitable Donations (THB)",
        "donation-norm-help": "Actual paid, capped at 10% of net income after other deductions",
        "btn-prev": "Previous",
        "btn-clear": "Clear All",
        "btn-next": "Next Step",
        "tax-payable-title": "Your Tax Payable",
        "net-income-lbl": "Net Income",
        "marginal-rate-lbl": "Marginal Tax Bracket",
        "effective-rate-lbl": "Effective Tax Rate: ",
        "tax-breakdown-chart": "Assessable Income Breakdown",
        "total-gross-lbl": "Total Income",
        "legend-net": "Net Remaining Income",
        "legend-expenses": "Standard Expenses",
        "legend-deductions": "Total Deductions",
        "legend-tax": "Tax Payable",
        "tax-brackets-title": "Progressive Tax Brackets",
        "advisor-title": "Smart Tax Advisor",
        "btn-print": "Print / Export Summary Report to PDF",
        "modal-guide-title": "Tax Allowances Guide (Tax Year 2025)",
        "modal-close": "Got it, thanks!",
        
        // Dynamic strings
        "baht": "THB",
        "exempt": "Exempted",
        "bracket-info": "Net Income portion {from} - {to}",
        "bracket-over": "Net Income portion over {from}",
        "bracket-spent": "Assessable income in this bracket: {amount} THB",
        "bracket-unused": "No income in this bracket",
        "advisor-no-tips": "Excellent! Your tax planning is optimal or your net income is fully exempted from tax. No additional recommendations are required.",
        "tip-esg": "Invest up to <strong>{amount} THB</strong> more in <strong>Thai ESG</strong>, saving an additional <strong>{saving} THB</strong> in taxes!",
        "tip-retirement": "Contribute up to <strong>{amount} THB</strong> more in retirement funds (<strong>SSF / RMF / Pension</strong>) to save <strong>{saving} THB</strong> more in taxes!",
        "tip-life-ins": "Purchase up to <strong>{amount} THB</strong> more in <strong>Life/Health insurance</strong> to maximize your allowance, saving <strong>{saving} THB</strong> in taxes!",
        "cap-warning": "Your retirement allowance total exceeds the legal limit of 500,000 THB. Capped at 500,000 THB.",
        
        // Guide
        "guide-h1": "1. Assessable Income & Deductible Expenses",
        "guide-p1": "Salary, bonuses and wages (Section 40(1)) are entitled to a standard standard deduction of 50%, capped at 100,000 THB.",
        "guide-h2": "2. Personal & Family Allowances",
        "guide-li2-1": "Taxpayer: 60,000 THB automatic deduction.",
        "guide-li2-2": "Spouse: 60,000 THB (must be legally married, with spouse earning zero income).",
        "guide-li2-3": "Children: 30,000 THB per child. The 2nd child onwards born in 2018 or later receives 60,000 THB.",
        "guide-li2-4": "Parents: 30,000 THB per parent. Must be 60+ years old and earning less than 30,000 THB/year (Max 4 parents total).",
        "guide-h3": "3. Life & Health Insurance",
        "guide-li3-1": "General Life Insurance: Actual premium paid, capped at 100,000 THB.",
        "guide-li3-2": "Personal Health Insurance: Max 25,000 THB (Combined with general life insurance max 100,000 THB).",
        "guide-li3-3": "Parents' Health Insurance: Capped at 15,000 THB (parents must earn less than 30,000 THB/year).",
        "guide-h4": "4. Retirement & Pension Savings (Combined Max 500,000 THB)",
        "guide-li4-1": "Provident Fund / GPF: Actual contributed, up to 15% of salary, capped at 500,000 THB.",
        "guide-li4-2": "RMF (Retirement Mutual Fund): Up to 30% of income, capped at 500,000 THB.",
        "guide-li4-3": "SSF (Super Savings Fund): Up to 30% of income, capped at 200,000 THB.",
        "guide-li4-4": "Pension Life Insurance: Up to 15% of income, capped at 200,000 THB.",
        "guide-h5": "5. Special Investment Incentives",
        "guide-li5-1": "Thai ESG (Thailand ESG Fund): Invest for tax deduction up to 30% of income, capped at 300,000 THB. This is independent **and NOT subject to the 500,000 THB retirement cap!**",
        "guide-li5-2": "Home Mortgage Interest: Capped at 100,000 THB.",
        "guide-li5-3": "2x Double Donation: Claim 2 times the actual donation (education/public hospitals), up to 10% of net income after all other deductions."
    }
};

// Application State
let currentLanguage = 'th';
let currentStep = 1;

// Tax Brackets Definition
const taxBrackets = [
    { min: 0, max: 150000, rate: 0, textKey: "exempt" },
    { min: 150001, max: 300000, rate: 0.05 },
    { min: 300001, max: 500000, rate: 0.10 },
    { min: 500001, max: 750000, rate: 0.15 },
    { min: 750001, max: 1000000, rate: 0.20 },
    { min: 1000001, max: 2000000, rate: 0.25 },
    { min: 2000001, max: 5000000, rate: 0.30 },
    { min: 5000001, max: Infinity, rate: 0.35 }
];

// ==========================================================================
// 2. Main DOM Elements & Event Bindings
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    // Initialize Lucide Icons
    lucide.createIcons();
    
    // Theme Switcher
    const btnTheme = document.getElementById("btn-theme");
    btnTheme.addEventListener("click", () => {
        const currentTheme = document.documentElement.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", newTheme);
    });
    
    // Language Switcher
    const btnLang = document.getElementById("btn-lang");
    btnLang.addEventListener("click", () => {
        currentLanguage = currentLanguage === 'th' ? 'en' : 'th';
        btnLang.querySelector(".lang-text").textContent = currentLanguage === 'th' ? 'EN' : 'TH';
        document.documentElement.setAttribute("lang", currentLanguage);
        applyTranslations();
        recalculateAndRender();
    });

    // Wizard Navigation Tab clicks
    const stepIndicators = document.querySelectorAll(".step-indicator");
    stepIndicators.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetStep = parseInt(btn.getAttribute("data-step"));
            switchStep(targetStep);
        });
    });

    // Next/Prev Buttons
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    
    btnNext.addEventListener("click", () => {
        if (currentStep < 5) {
            switchStep(currentStep + 1);
        }
    });

    btnPrev.addEventListener("click", () => {
        if (currentStep > 1) {
            switchStep(currentStep - 1);
        }
    });

    // Reset Form Button
    const btnReset = document.getElementById("btn-reset");
    btnReset.addEventListener("click", () => {
        if (confirm(currentLanguage === 'th' ? "คุณต้องการล้างข้อมูลการกรอกทั้งหมดใช่หรือไม่?" : "Are you sure you want to clear all input data?")) {
            document.getElementById("tax-form").reset();
            recalculateAndRender();
            switchStep(1);
        }
    });

    // Social Security Auto-Fill
    const btnAutoSocial = document.getElementById("btn-auto-social-sec");
    btnAutoSocial.addEventListener("click", () => {
        const salary = parseFloat(document.getElementById("monthly-salary").value) || 0;
        // Calculation: 5% of salary, capped at 750/month = max 9,000/year
        const autoSS = Math.min(salary * 0.05 * 12, 9000);
        document.getElementById("social-security").value = Math.round(autoSS);
        recalculateAndRender();
    });

    // Bind real-time input change recalculation
    const inputControls = document.querySelectorAll(".input-control, .checkbox-control");
    inputControls.forEach(input => {
        input.addEventListener("input", recalculateAndRender);
        input.addEventListener("change", recalculateAndRender);
    });

    // Print Action
    const btnPrint = document.getElementById("btn-print");
    btnPrint.addEventListener("click", printTaxReport);

    // Initial load
    applyTranslations();
    recalculateAndRender();
});

// ==========================================================================
// 3. UI Navigation Logic
// ==========================================================================
function switchStep(stepNum) {
    if (stepNum < 1 || stepNum > 5) return;
    
    // Hide active step content, show new one
    document.querySelectorAll(".wizard-step-content").forEach(el => el.classList.remove("active"));
    document.getElementById(`step-content-${stepNum}`).classList.add("active");
    
    // Update Indicators
    document.querySelectorAll(".step-indicator").forEach((el, index) => {
        const stepIdx = index + 1;
        el.classList.remove("active");
        if (stepIdx === stepNum) {
            el.classList.add("active");
        } else if (stepIdx < stepNum) {
            el.classList.add("completed");
        } else {
            el.classList.remove("completed");
        }
    });

    currentStep = stepNum;

    // Show/Hide Prev button
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    
    btnPrev.style.visibility = currentStep === 1 ? "hidden" : "visible";
    
    // Update Next button text on last step
    const nextBtnText = btnNext.querySelector("span") || btnNext;
    if (currentStep === 5) {
        btnNext.innerHTML = currentLanguage === 'th' ? `ผลลัพธ์สุดท้าย <i data-lucide="check"></i>` : `Show Results <i data-lucide="check"></i>`;
        // Recreate icons
        lucide.createIcons();
    } else {
        btnNext.innerHTML = `${translations[currentLanguage]["btn-next"]} <i data-lucide="arrow-right"></i>`;
        lucide.createIcons();
    }
}

// Translate Page Static Texts
function applyTranslations() {
    const dict = translations[currentLanguage];
    document.getElementById("app-title").textContent = dict["app-title"];
    
    // Find all elements with data-i18n
    const elements = document.querySelectorAll("[data-i18n]");
    elements.forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (dict[key]) {
            // Keep inner elements like icons if present
            const icon = el.querySelector("i, span.badge");
            if (icon) {
                // If it's a dynamic structure, be careful. Usually simple labels
                el.childNodes.forEach(child => {
                    if (child.nodeType === Node.TEXT_NODE) {
                        child.nodeValue = " " + dict[key] + " ";
                    }
                });
            } else {
                el.innerHTML = dict[key];
            }
        }
    });
    
    // Custom labels/placeholders
    document.getElementById("monthly-salary").placeholder = "0";
    document.getElementById("annual-bonus").placeholder = "0";
    document.getElementById("other-income").placeholder = "0";
    
    // Adjust specific texts in wizard buttons
    switchStep(currentStep);
}

// Format numbers nicely
function formatNum(num) {
    return new Intl.NumberFormat().format(Math.round(num));
}

// ==========================================================================
// 4. Tax Calculation Core Engine
// ==========================================================================
function performCalculations() {
    // A. Gross Income
    const salary = parseFloat(document.getElementById("monthly-salary").value) || 0;
    const bonus = parseFloat(document.getElementById("annual-bonus").value) || 0;
    const otherIncome = parseFloat(document.getElementById("other-income").value) || 0;
    
    const grossSalary = salary * 12;
    const grossIncome = grossSalary + bonus + otherIncome;

    // B. Expenses (40(1) 50% max 100k)
    // In Thailand, for salary and bonus, the standard deduction is 50% max 100,000 Baht.
    // If there is otherIncome, standard rules might vary, but to keep the calculator 
    // highly helpful and standard for salary earners, weหัก 50% of the entire gross, max 100,000 THB.
    const expenses = Math.min(grossIncome * 0.5, 100000);

    // C. Deductions
    const allowances = {};
    
    // 1. Personal & Family Allowances
    allowances.personal = 60000;
    
    const hasSpouse = document.getElementById("has-spouse").checked;
    allowances.spouse = hasSpouse ? 60000 : 0;
    
    const childCount = Math.max(0, parseInt(document.getElementById("child-count").value) || 0);
    const childPost2561Count = Math.max(0, parseInt(document.getElementById("child-post2561-count").value) || 0);
    allowances.child = (childCount * 30000) + (childPost2561Count * 60000);
    
    const parentCount = Math.min(4, Math.max(0, parseInt(document.getElementById("parent-count").value) || 0));
    allowances.parents = parentCount * 30000;
    
    const disabledCount = Math.max(0, parseInt(document.getElementById("disabled-count").value) || 0);
    allowances.disabled = disabledCount * 60000;

    // 2. Insurance Deductions
    const socialSecurity = Math.min(9000, Math.max(0, parseFloat(document.getElementById("social-security").value) || 0));
    allowances.socialSec = socialSecurity;
    
    const lifeInsurance = Math.max(0, parseFloat(document.getElementById("life-insurance").value) || 0);
    const healthInsurance = Math.max(0, parseFloat(document.getElementById("health-insurance").value) || 0);
    
    // Life + Health combined cap: 100,000 THB. Health itself cap: 25,000 THB.
    const cappedHealth = Math.min(healthInsurance, 25000);
    const combinedLifeHealth = Math.min(lifeInsurance + cappedHealth, 100000);
    allowances.lifeInsurance = combinedLifeHealth;
    
    const parentHealthInsurance = Math.min(15000, Math.max(0, parseFloat(document.getElementById("parent-health-insurance").value) || 0));
    allowances.parentHealth = parentHealthInsurance;

    // 3. Retirement & Savings (Cap 500,000 THB total)
    const pvd = Math.min(grossIncome * 0.15, Math.max(0, parseFloat(document.getElementById("provident-fund").value) || 0));
    const pensionIns = Math.min(grossIncome * 0.15, Math.min(200000, Math.max(0, parseFloat(document.getElementById("pension-insurance").value) || 0)));
    const rmf = Math.min(grossIncome * 0.30, Math.max(0, parseFloat(document.getElementById("rmf").value) || 0));
    const ssf = Math.min(grossIncome * 0.30, Math.min(200000, Math.max(0, parseFloat(document.getElementById("ssf").value) || 0)));
    const nsf = Math.min(30000, Math.max(0, parseFloat(document.getElementById("nsf").value) || 0));
    
    const rawRetirementTotal = pvd + pensionIns + rmf + ssf + nsf;
    const cappedRetirementTotal = Math.min(rawRetirementTotal, 500000);
    const isRetirementCapped = rawRetirementTotal > 500000;
    
    allowances.retirement = cappedRetirementTotal;

    // 4. Special Green Fund (Thai ESG) - Separate from 500k cap! Capped at 30% of income, max 300,000 THB
    const thaiEsg = Math.min(grossIncome * 0.30, Math.min(300000, Math.max(0, parseFloat(document.getElementById("thai-esg").value) || 0)));
    allowances.thaiEsg = thaiEsg;

    // 5. Property & Stimulus
    const homeLoan = Math.min(100000, Math.max(0, parseFloat(document.getElementById("home-loan-interest").value) || 0));
    allowances.homeLoan = homeLoan;
    
    const shoppingStimulus = Math.max(0, parseFloat(document.getElementById("shopping-stimulus").value) || 0); // Custom stimulus
    allowances.shopping = shoppingStimulus;

    // Sum allowances before donations
    const allowancesBeforeDonations = 
        allowances.personal + allowances.spouse + allowances.child + allowances.parents + allowances.disabled + 
        allowances.socialSec + allowances.lifeInsurance + allowances.parentHealth + 
        allowances.retirement + allowances.thaiEsg + allowances.homeLoan + allowances.shopping;

    // 6. Donations (Capped at 10% of remaining net income after other deductions)
    let netBeforeDonations = grossIncome - expenses - allowancesBeforeDonations;
    if (netBeforeDonations < 0) netBeforeDonations = 0;

    const donationDouble = Math.max(0, parseFloat(document.getElementById("donation-double").value) || 0);
    const donationNormal = Math.max(0, parseFloat(document.getElementById("donation-normal").value) || 0);

    // Double donation gets 2x actual, but capped at 10% of net before donations
    const maxDonationCap = netBeforeDonations * 0.10;
    const doubleClaim = donationDouble * 2;
    const allowedDouble = Math.min(doubleClaim, maxDonationCap);
    
    // Normal donation capped at 10% of (net before - allowed double)
    const remainingDonationCap = maxDonationCap - (allowedDouble / 2); // strictly, combined double (at 1x) and normal donation must not exceed 10%
    // Revenue dept rules: Double donation (2x) and standard donation (1x) combined must not exceed 10% of net income
    // Net Income after all other allowances
    const totalDonationInput = (donationDouble * 2) + donationNormal;
    const allowedDonations = Math.min(totalDonationInput, netBeforeDonations * 0.10);
    allowances.donations = allowedDonations;

    // D. Final Net Income
    const totalDeductions = allowancesBeforeDonations + allowances.donations;
    let netIncome = grossIncome - expenses - totalDeductions;
    if (netIncome < 0) netIncome = 0;

    // E. Tax Progressive Calculation
    const taxResults = calculateProgressiveTax(netIncome);

    return {
        grossIncome,
        expenses,
        allowances,
        totalDeductions,
        netIncome,
        taxPayable: taxResults.tax,
        marginalRate: taxResults.marginalRate,
        brackets: taxResults.brackets,
        isRetirementCapped,
        rawRetirementTotal
    };
}

function calculateProgressiveTax(netIncome) {
    let remaining = netIncome;
    let totalTax = 0;
    let marginalRate = 0;
    const bracketDetails = [];

    for (let i = 0; i < taxBrackets.length; i++) {
        const bracket = taxBrackets[i];
        const nextMin = bracket.min;
        const nextMax = bracket.max;
        const rate = bracket.rate;
        
        let amountInBracket = 0;
        let taxInBracket = 0;

        if (netIncome >= nextMin) {
            const limit = nextMax === Infinity ? Infinity : (nextMax - nextMin + 1);
            amountInBracket = Math.min(netIncome - nextMin + 1, limit);
            taxInBracket = amountInBracket * rate;
            totalTax += taxInBracket;
            
            if (taxInBracket > 0) {
                marginalRate = rate;
            }
            
            bracketDetails.push({
                index: i,
                rangeText: formatBracketRange(nextMin, nextMax),
                ratePercent: (rate * 100).toFixed(0) + "%",
                amount: amountInBracket,
                tax: taxInBracket,
                active: true,
                percentSpent: nextMax === Infinity ? 100 : Math.min(100, (amountInBracket / limit) * 100)
            });
        } else {
            bracketDetails.push({
                index: i,
                rangeText: formatBracketRange(nextMin, nextMax),
                ratePercent: (rate * 100).toFixed(0) + "%",
                amount: 0,
                tax: 0,
                active: false,
                percentSpent: 0
            });
        }
    }

    return {
        tax: Math.round(totalTax),
        marginalRate: (marginalRate * 100).toFixed(0) + "%",
        brackets: bracketDetails
    };
}

function formatBracketRange(min, max) {
    if (max === Infinity) {
        return currentLanguage === 'th' ? `เกิน ${formatNum(min - 1)} บาท` : `Over ${formatNum(min - 1)}`;
    }
    return `${formatNum(min - 1)} - ${formatNum(max)}`;
}

// ==========================================================================
// 5. Smart DOM Rendering & Dynamic Graphics
// ==========================================================================
function recalculateAndRender() {
    const data = performCalculations();
    
    // Update simple visual boxes in Step 1
    document.getElementById("calc-gross-income").textContent = formatNum(data.grossIncome) + ` ${translations[currentLanguage]['baht']}`;
    document.getElementById("calc-expenses").textContent = "-" + formatNum(data.expenses) + ` ${translations[currentLanguage]['baht']}`;

    // Update Main Metrics Card
    document.getElementById("tax-payable").textContent = formatNum(data.taxPayable);
    document.getElementById("res-net-income").textContent = formatNum(data.netIncome) + " ฿";
    document.getElementById("res-marginal-rate").textContent = data.marginalRate;
    
    const effectiveRate = data.grossIncome > 0 ? (data.taxPayable / data.grossIncome) * 100 : 0;
    document.getElementById("res-effective-rate").textContent = effectiveRate.toFixed(2) + "%";

    // Show retirement warning if capped
    const capAlert = document.getElementById("retirement-cap-alert");
    if (data.isRetirementCapped) {
        capAlert.style.display = "flex";
        document.getElementById("retirement-cap-msg").textContent = translations[currentLanguage]["cap-warning"];
    } else {
        capAlert.style.display = "none";
    }

    // Render progressive tax brackets list
    renderBracketsList(data.brackets);

    // Update SVG Chart
    updateDonutChart(data);

    // Render Smart Tax Advisory
    renderTaxSavingTips(data);
}

function renderBracketsList(brackets) {
    const container = document.getElementById("bracket-list");
    container.innerHTML = "";

    brackets.forEach(b => {
        const item = document.createElement("div");
        item.className = `bracket-item ${b.active ? 'active' : ''} ${b.index === 0 ? 'exempt' : ''}`;
        
        let desc = "";
        if (b.active) {
            desc = currentLanguage === 'th' ? `เงินพึงประเมินในช่วงนี้: ${formatNum(b.amount)} บาท` : `Assessable portion: ${formatNum(b.amount)} THB`;
        } else {
            desc = translations[currentLanguage]["bracket-unused"];
        }

        item.innerHTML = `
            <div class="bracket-header">
                <span class="bracket-tax-range">${b.rangeText}</span>
                <span class="bracket-rate-badge">${b.ratePercent}</span>
            </div>
            <div class="bracket-progress-wrapper">
                <div class="bracket-progress-bar" style="width: ${b.percentSpent}%"></div>
            </div>
            <div class="bracket-meta">
                <span>${desc}</span>
                <span class="bracket-calc-tax">${b.active ? '฿' + formatNum(b.tax) : '-'}</span>
            </div>
        `;
        container.appendChild(item);
    });
}

function updateDonutChart(data) {
    const gross = data.grossIncome;
    let netLeft = gross - data.expenses - data.totalDeductions - data.taxPayable;
    if (netLeft < 0) netLeft = 0;

    // Calculate percentages
    const expPct = gross > 0 ? (data.expenses / gross) * 100 : 0;
    const dedPct = gross > 0 ? (data.totalDeductions / gross) * 100 : 0;
    const taxPct = gross > 0 ? (data.taxPayable / gross) * 100 : 0;
    const netPct = gross > 0 ? (netLeft / gross) * 100 : 100;

    // Update legend values
    document.getElementById("legend-net-val").textContent = netPct.toFixed(1) + "%";
    document.getElementById("legend-expenses-val").textContent = expPct.toFixed(1) + "%";
    document.getElementById("legend-deductions-val").textContent = dedPct.toFixed(1) + "%";
    document.getElementById("legend-tax-val").textContent = taxPct.toFixed(1) + "%";
    document.getElementById("donut-center-val").textContent = formatNum(gross) + " ฿";

    // SVG drawing logic
    // Circumference of our circle is ~534 (2 * PI * r) with r=85
    const circumference = 534;
    
    // Segments percentages mapping
    // Calculate segments lengths
    const lenNet = (netPct / 100) * circumference;
    const lenExp = (expPct / 100) * circumference;
    const lenDed = (dedPct / 100) * circumference;
    const lenTax = (taxPct / 100) * circumference;

    // Select segments
    const segNet = document.getElementById("segment-net");
    const segExp = document.getElementById("segment-expenses");
    const segDed = document.getElementById("segment-deductions");
    const segTax = document.getElementById("segment-tax");

    // Animate stroke dasharray and dashoffset
    // Segment drawing order: Net -> Expenses -> Deductions -> Tax
    let offset = 0;

    // Net
    segNet.style.strokeDasharray = `${lenNet} ${circumference}`;
    segNet.style.strokeDashoffset = -offset;
    offset += lenNet;

    // Expenses
    segExp.style.strokeDasharray = `${lenExp} ${circumference}`;
    segExp.style.strokeDashoffset = -offset;
    offset += lenExp;

    // Deductions
    segDed.style.strokeDasharray = `${lenDed} ${circumference}`;
    segDed.style.strokeDashoffset = -offset;
    offset += lenDed;

    // Tax
    segTax.style.strokeDasharray = `${lenTax} ${circumference}`;
    segTax.style.strokeDashoffset = -offset;
}

// ==========================================================================
// 6. Smart Tax Advisor (Recommendations Algorithm)
// ==========================================================================
function renderTaxSavingTips(data) {
    const container = document.getElementById("advisor-tips");
    container.innerHTML = "";
    
    const gross = data.grossIncome;
    const currentTax = data.taxPayable;

    // If gross is zero or tax is zero, no tips needed
    if (gross <= 0 || currentTax <= 0) {
        container.innerHTML = `<div class="advisor-no-tips">${translations[currentLanguage]["advisor-no-tips"]}</div>`;
        return;
    }

    const tips = [];

    // Auxiliary shadow tax calculation helper
    function getShadowSavings(extraDeduction) {
        const shadowData = performShadowCalculations(extraDeduction);
        return Math.max(0, currentTax - shadowData.taxPayable);
    }

    // 1. Thai ESG Saving tip
    const maxEsg = gross * 0.30;
    const allowedEsgCap = Math.min(maxEsg, 300000);
    const currentEsg = parseFloat(document.getElementById("thai-esg").value) || 0;
    const esgRoom = Math.max(0, allowedEsgCap - currentEsg);
    
    if (esgRoom > 1000) {
        const shadowSavings = getShadowSavings({ esg: esgRoom });
        if (shadowSavings > 0) {
            tips.push({
                type: 'esg',
                room: esgRoom,
                saving: shadowSavings,
                text: translations[currentLanguage]["tip-esg"]
                    .replace("{amount}", formatNum(esgRoom))
                    .replace("{saving}", formatNum(shadowSavings))
            });
        }
    }

    // 2. Retirement Group Saving tip (SSF, RMF, Pension combined max 500k cap)
    const currentPvd = parseFloat(document.getElementById("provident-fund").value) || 0;
    const currentPension = parseFloat(document.getElementById("pension-insurance").value) || 0;
    const currentRmf = parseFloat(document.getElementById("rmf").value) || 0;
    const currentSsf = parseFloat(document.getElementById("ssf").value) || 0;
    const currentNsf = parseFloat(document.getElementById("nsf").value) || 0;
    
    const currentRetirementTotal = currentPvd + currentPension + currentRmf + currentSsf + currentNsf;
    const retirementRoom = Math.max(0, 500000 - currentRetirementTotal);

    // Individual room details
    const ssfMaxRoom = Math.max(0, Math.min(gross * 0.30, 200000) - currentSsf);
    const rmfMaxRoom = Math.max(0, (gross * 0.30) - currentRmf);
    const pensionMaxRoom = Math.max(0, Math.min(gross * 0.15, 200000) - currentPension);
    const individualRoomsTotal = ssfMaxRoom + rmfMaxRoom + pensionMaxRoom;

    const actualRetirementInvestableRoom = Math.min(retirementRoom, individualRoomsTotal);

    if (actualRetirementInvestableRoom > 1000) {
        const shadowSavings = getShadowSavings({ retirement: actualRetirementInvestableRoom });
        if (shadowSavings > 0) {
            tips.push({
                type: 'retirement',
                room: actualRetirementInvestableRoom,
                saving: shadowSavings,
                text: translations[currentLanguage]["tip-retirement"]
                    .replace("{amount}", formatNum(actualRetirementInvestableRoom))
                    .replace("{saving}", formatNum(shadowSavings))
            });
        }
    }

    // 3. Insurance Saving tip
    const currentLife = parseFloat(document.getElementById("life-insurance").value) || 0;
    const currentHealth = parseFloat(document.getElementById("health-insurance").value) || 0;
    const currentCappedHealth = Math.min(currentHealth, 25000);
    const currentCombinedInsurance = currentLife + currentCappedHealth;
    
    const insuranceRoom = Math.max(0, 100000 - currentCombinedInsurance);
    
    if (insuranceRoom > 1000) {
        const shadowSavings = getShadowSavings({ insurance: insuranceRoom });
        if (shadowSavings > 0) {
            tips.push({
                type: 'insurance',
                room: insuranceRoom,
                saving: shadowSavings,
                text: translations[currentLanguage]["tip-life-ins"]
                    .replace("{amount}", formatNum(insuranceRoom))
                    .replace("{saving}", formatNum(shadowSavings))
            });
        }
    }

    // Render Tips
    if (tips.length === 0) {
        container.innerHTML = `<div class="advisor-no-tips">${translations[currentLanguage]["advisor-no-tips"]}</div>`;
    } else {
        // Sort tips by potential saving size descending
        tips.sort((a, b) => b.saving - a.saving);
        
        tips.forEach((tip, idx) => {
            const tipEl = document.createElement("div");
            tipEl.className = "advisor-tip";
            tipEl.innerHTML = `
                <div class="advisor-tip-badge">${idx + 1}</div>
                <div class="advisor-tip-content">
                    <span class="advisor-tip-text">${tip.text}</span>
                </div>
            `;
            container.appendChild(tipEl);
        });
    }
}

// Perform shadow calculations ignoring input fields values to evaluate potential tax savings
function performShadowCalculations(extraDeductions) {
    const base = performCalculations();
    
    let extraEsg = extraDeductions.esg || 0;
    let extraRetirement = extraDeductions.retirement || 0;
    let extraInsurance = extraDeductions.insurance || 0;

    let gross = base.grossIncome;
    let exp = base.expenses;
    
    // Add extra deductions
    let shadowDeductions = base.totalDeductions + extraEsg + extraRetirement + extraInsurance;
    
    let net = gross - exp - shadowDeductions;
    if (net < 0) net = 0;

    const shadowTaxResults = calculateProgressiveTax(net);
    return {
        taxPayable: shadowTaxResults.tax
    };
}

// ==========================================================================
// 7. Print Report Logic
// ==========================================================================
function printTaxReport() {
    const data = performCalculations();
    
    // Set Print Date
    const today = new Date();
    const dateString = today.toLocaleDateString(currentLanguage === 'th' ? 'th-TH' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
    document.getElementById("print-date").textContent = dateString;

    // Load Basic Details
    document.getElementById("print-gross-income").textContent = formatNum(data.grossIncome) + " ฿";
    document.getElementById("print-expenses").textContent = "-" + formatNum(data.expenses) + " ฿";
    document.getElementById("print-income-after-exp").textContent = formatNum(data.grossIncome - data.expenses) + " ฿";
    
    document.getElementById("print-net-income").textContent = formatNum(data.netIncome) + " ฿";
    document.getElementById("print-marginal-rate").textContent = data.marginalRate;
    
    const effectiveRate = data.grossIncome > 0 ? (data.taxPayable / data.grossIncome) * 100 : 0;
    document.getElementById("print-effective-rate").textContent = effectiveRate.toFixed(2) + "%";
    
    const taxPayables = document.querySelectorAll("#print-tax-payable");
    taxPayables.forEach(el => el.textContent = formatNum(data.taxPayable) + " ฿");

    document.getElementById("print-total-deductions").textContent = formatNum(data.totalDeductions) + " ฿";

    // Build Deductions List Table
    const dTable = document.getElementById("print-deductions-table");
    dTable.innerHTML = "";
    
    const labels = {
        th: {
            personal: "ลดหย่อนส่วนตัว",
            spouse: "ลดหย่อนคู่สมรส",
            child: "ลดหย่อนบุตร",
            parents: "อุปการะบิดามารดา",
            disabled: "ดูแลผู้พิการ",
            socialSec: "ประกันสังคม",
            lifeInsurance: "ประกันชีวิตและสุขภาพตัวเอง",
            parentHealth: "ประกันสุขภาพบิดามารดา",
            retirement: "กลุ่มกองทุนเกษียณรวม (PVD/SSF/RMF/Pension)",
            thaiEsg: "กองทุนเพื่อความยั่งยืน Thai ESG",
            homeLoan: "ดอกเบี้ยกู้บ้าน",
            shopping: "มาตรการลดหย่อนอสังหาฯ/กระตุ้นรัฐ/อื่นๆ",
            donations: "เงินบริจาคสนับสนุนและทั่วไป"
        },
        en: {
            personal: "Personal Allowance",
            spouse: "Spouse Allowance",
            child: "Child Allowance",
            parents: "Parents Support Allowance",
            disabled: "Disabled Care Allowance",
            socialSec: "Social Security Contributions",
            lifeInsurance: "General Life & Health Insurance",
            parentHealth: "Parents' Health Insurance",
            retirement: "Retirement Savings Group (PVD/SSF/RMF/Pension)",
            thaiEsg: "Sustainable Fund (Thai ESG)",
            homeLoan: "Home Mortgage Loan Interest",
            shopping: "Property/Gov Stimulus incentives/Other",
            donations: "Charitable & Standard Donations"
        }
    };

    const dl = labels[currentLanguage];
    const allowances = data.allowances;

    // Add active deductions to print summary
    if (allowances.personal > 0) appendPrintDeductionRow(dTable, dl.personal, allowances.personal);
    if (allowances.spouse > 0) appendPrintDeductionRow(dTable, dl.spouse, allowances.spouse);
    if (allowances.child > 0) appendPrintDeductionRow(dTable, dl.child, allowances.child);
    if (allowances.parents > 0) appendPrintDeductionRow(dTable, dl.parents, allowances.parents);
    if (allowances.disabled > 0) appendPrintDeductionRow(dTable, dl.disabled, allowances.disabled);
    if (allowances.socialSec > 0) appendPrintDeductionRow(dTable, dl.socialSec, allowances.socialSec);
    if (allowances.lifeInsurance > 0) appendPrintDeductionRow(dTable, dl.lifeInsurance, allowances.lifeInsurance);
    if (allowances.parentHealth > 0) appendPrintDeductionRow(dTable, dl.parentHealth, allowances.parentHealth);
    if (allowances.retirement > 0) appendPrintDeductionRow(dTable, dl.retirement, allowances.retirement);
    if (allowances.thaiEsg > 0) appendPrintDeductionRow(dTable, dl.thaiEsg, allowances.thaiEsg);
    if (allowances.homeLoan > 0) appendPrintDeductionRow(dTable, dl.homeLoan, allowances.homeLoan);
    if (allowances.shopping > 0) appendPrintDeductionRow(dTable, dl.shopping, allowances.shopping);
    if (allowances.donations > 0) appendPrintDeductionRow(dTable, dl.donations, allowances.donations);

    // Build Bracket Progressive Table
    const bTableBody = document.getElementById("print-bracket-body");
    bTableBody.innerHTML = "";

    data.brackets.forEach(b => {
        const row = document.createElement("tr");
        if (b.active && b.tax > 0) {
            row.style.fontWeight = "bold";
        }
        row.innerHTML = `
            <td>${b.rangeText}</td>
            <td class="text-right">${b.ratePercent}</td>
            <td class="text-right">${formatNum(b.amount)} ฿</td>
            <td class="text-right">${b.active && b.tax > 0 ? formatNum(b.tax) + ' ฿' : '-'}</td>
        `;
        bTableBody.appendChild(row);
    });

    // Fire default browser print dialog
    window.print();
}

function appendPrintDeductionRow(tableElement, title, val) {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${title}:</td><td class="text-right text-red">-${formatNum(val)} ฿</td>`;
    tableElement.appendChild(row);
}
