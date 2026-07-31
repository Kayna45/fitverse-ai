// FitVerse AI - PDF & CSV Export Service
import { jsPDF } from 'jspdf';

export const exportToCSV = (filename, rows) => {
  if (!rows || !rows.length) return;
  const separator = ',';
  const keys = Object.keys(rows[0]);
  const csvContent =
    keys.join(separator) +
    '\n' +
    rows
      .map(row => {
        return keys
          .map(k => {
            let cell = row[k] === null || row[k] === undefined ? '' : row[k];
            cell = cell instanceof Date ? cell.toLocaleString() : cell.toString();
            cell = cell.replace(/"/g, '""');
            if (cell.search(/("|,|\n)/g) >= 0) {
              cell = `"${cell}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const exportWorkoutReportPDF = (user, workoutLogs, foodLogs) => {
  const doc = new jsPDF();

  // Header
  doc.setFillColor(11, 15, 25); // Dark blue
  doc.rect(0, 0, 210, 40, 'F');

  doc.setTextColor(34, 197, 94); // Emerald
  doc.setFontSize(22);
  doc.text('FITVERSE AI - Performance Report', 15, 22);

  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.text(`Athlete: ${user.name} | Level ${user.level} | Date: ${new Date().toLocaleDateString()}`, 15, 32);

  // Body - Workout Logs
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(14);
  doc.text('Recent Workout Sessions', 15, 52);

  let y = 62;
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text('Date', 15, y);
  doc.text('Exercise', 45, y);
  doc.text('Sets x Reps', 110, y);
  doc.text('Weight (kg)', 150, y);
  doc.text('Calories', 180, y);

  doc.line(15, y + 2, 195, y + 2);
  y += 10;

  doc.setTextColor(30, 30, 30);
  workoutLogs.forEach(log => {
    doc.text(log.date || 'Today', 15, y);
    doc.text(log.exerciseName || 'Exercise', 45, y);
    doc.text(`${log.sets} x ${log.reps}`, 110, y);
    doc.text(`${log.weight} kg`, 150, y);
    doc.text(`${log.caloriesBurned} kcal`, 180, y);
    y += 8;
  });

  // Footer
  doc.setFontSize(9);
  doc.setTextColor(150, 150, 150);
  doc.text('Generated automatically by FitVerse AI Coach System', 15, 280);

  doc.save(`FitVerse_Report_${user.name}_${Date.now()}.pdf`);
};
