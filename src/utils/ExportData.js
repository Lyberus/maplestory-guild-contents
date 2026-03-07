import * as XLSX from 'xlsx'

export default function exportData(records) {
    const excelData = records.map((record, index) => ({
        "번호": (index + 1),
        "이름": record.name,
        "주간미션": record.week,
        "지하수로": record.culv,
        "플래그레이스": record.flag
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "길드컨텐츠");

    XLSX.writeFile(workbook, "길드컨텐츠.xlsx");
};