import Calendar from 'react-calendar';

type CalendaProps = {
  selectedDate: string | null,
  setSelectedDate: React.Dispatch<React.SetStateAction<string | null>>
};

export default function Calenda({selectedDate, setSelectedDate}: CalendaProps) {

  const formatDateToTimestamp = (date: Date) => {
    if(!date) return null;

    const now = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const fullDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return fullDate;
  };

  const handleDateChange = (date: any) => {
    const formatedDate = formatDateToTimestamp(date);
    setSelectedDate(formatedDate);
    console.log("Выбранная дата" + formatedDate);
  };

  return (
    <div className="w-96 mb-2">
      <h3>Выберите дату</h3>
      <Calendar 
        onChange={handleDateChange}
        value={selectedDate ? new Date(selectedDate) : null}
        selectRange={false}
      />
      <p>Выбранная дата: {selectedDate || "Не выбрано"}</p>
    </div>
  )
}
