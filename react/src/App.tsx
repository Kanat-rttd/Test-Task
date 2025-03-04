import { useState } from 'react'
import './App.css'
import Calenda from './Calenda'

function App() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [sum, setSum] = useState<number>();
  const [selectedCategory, setSelectedCategory] = useState<string>("Продукты");
  const [comment, setComment] = useState<string>();
  // const [fullInfo, setFullInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSumChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSum(Number(e.target.value));
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    setSelectedCategory(newCategory);
    console.log(newCategory)
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log("form submitted")

    const info = {
      dateTime: selectedDate,
      author: "kanat",
      sum: sum,
      category: selectedCategory,
      comment: comment,
    }

    try {
      const response = await fetch('http://localhost:3000/api/transactions', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(info),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Successful " + data);
      } else {
        console.error("Server error " + response.statusText)
      }
    } catch (error) {
      console.error("Error " + error);
    } finally {
      setIsSubmitting(false)
    };

    setSum(undefined);
    setSelectedCategory("Продукты");
    setComment(undefined);
    setSelectedDate(null);
  }

  return (
    <div>
      <h1 className='text-2xl mb-3'>My expenses</h1>
      <form onSubmit={handleSubmit}>

        <div className='flex items-center justify-evenly w-[1096px]'>
          <Calenda selectedDate={selectedDate} setSelectedDate={setSelectedDate} />

          <div className='flex flex-col items-center justify-around h-80'>
            <div className='flex flex-col'>
              <label className='mr-1'>Сумма (тг)</label>
              <input
                type="number"
                className='p-1 w-48 rounded-lg'
                onChange={handleSumChange}
              />
            </div>

            <div className='flex flex-col'>
              <label className='mr-1'>Категория</label>
              <select
                name='category'
                id='category'
                value={selectedCategory}
                onChange={handleCategoryChange}
                className='p-1 w-48 rounded-lg'
              >
                <option value="Продукты">Продукты</option>
                <option value="Спорт">Спорт</option>
                <option value="Развлечения">Развлечения</option>
              </select>
            </div>

            <div>
              <label className='mr-1'>Комментарий</label>
              <textarea
                placeholder='Введите дополнительную информацию...'
                value={comment}
                onChange={handleCommentChange}
                className='p-1 h-24 w-full rounded-lg'
              />
            </div>

          </div>

        </div>

        <button type='submit' disabled={isSubmitting}>
          {isSubmitting ? "Отправка..." : "Записать"}
        </button>
      </form>

    </div>
  )
}

export default App
