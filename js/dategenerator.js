        const dateCollection = document.querySelectorAll(".date");
        // Получаем текущую дату
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');      // День месяца (два знака)
        const month = String(now.getMonth() + 1).padStart(2, '0'); // Месяц (два знака)
        const fullYear = String(now.getFullYear());                  // Год (четыре цифры)
        const shortYear = fullYear % 100;

        // Объединяем числа в одну строку и превращаем в массив отдельных цифр
        const digitsArray = [...day + month + shortYear];

        // Заполняем каждый элемент списка отдельной цифрой
        digitsArray.forEach((digit, index) => {
            if (index >= dateCollection.length) return; // Проверка, чтобы избежать выхода за пределы массива
            dateCollection[index].textContent = digit;
        });