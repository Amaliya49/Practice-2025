let randomNumber;
let attempts;
let maxAttempts;
let minRange;
let maxRange;

function startGame() {
    //диапазон
    minRange = parseInt(document.getElementById("minRange").value); 
    maxRange = parseInt(document.getElementById("maxRange").value); 

    if (isNaN(minRange) || isNaN(maxRange)) {
        swal("Ошибка!", "Введите мимнимальное и максимальное значения!", "error");
        return;
    }
    if (minRange >= maxRange) {
        swal("Ошибка!", "Минимальное значение должно быть меньше максимального!", "error");
        return;
    }  

    document.getElementById("ranges").hidden=true; //скрываем окно для ввода мин. и макс. значений
    
    attempts = 0;
    randomNumber = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange; //генерация числа из диапазона
    maxAttempts = Math.ceil(Math.log2(maxRange - minRange + 1)); //генерация количества попыток

    document.getElementById("instructions").textContent = `Компьютер загадал число от ${minRange} до ${maxRange}. Попробуйте его угадать! Количество ваших попыток: ${maxAttempts}.`;
    document.getElementById("gameArea").hidden=false; //показываем окно с самой игрой
}

function play() {
    const inputNumber = document.getElementById("input").value; //введенное число
    const result = document.getElementById("result"); //вывод сообщений

    //проверка на ввод числа, не находящегося в указанном диапазоне
    if (inputNumber > maxRange || inputNumber < minRange) {
        swal("Ошибка!",`Пожалуйста, введите число от ${minRange} до ${maxRange}!`, "error");
        return; 
    }
    //проверка на пустое значение
    if(inputNumber === "") {
        swal("Ошибка!", "Пожалуйста, введите число!", "error");
        return;
    }
    //проверка на ввод букв и символов
    if (!/^\d+$/.test(inputNumber)) {
        swal("Ошибка!", "Вводить можно только цифры и числа!", "error");
        return; 
    }

    attempts++;
    if (attempts > maxAttempts) {
        result.textContent = `Вы исчерпали все попытки! Загаданное число было: ${randomNumber}`;
        document.getElementById("checkButton").disabled = true;
        return;
    }
    if (inputNumber < randomNumber) { 
        result.textContent = `Ууупс! Загаданное число больше введенного! У вас осталось ${maxAttempts - attempts} попыток.`;
    } 
    else if (inputNumber > randomNumber) {
        result.textContent = `Ууупс! Загаданное число меньше введенного! У вас осталось ${maxAttempts - attempts} попыток.`;
    } 
    else {
        result.textContent = `Поздравляем! Вы угадали число ${randomNumber} за ${attempts} попыток!`;
        document.getElementById("checkButton").disabled = true;
    }
}
//сброс всех параметров при обновлении игры
function resetGame() {
    document.getElementById("ranges").hidden=false;
    document.getElementById("minRange").value = "";
    document.getElementById("maxRange").value = "";
    document.getElementById("input").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("checkButton").disabled = false;
    document.getElementById("gameArea").hidden = true;
}