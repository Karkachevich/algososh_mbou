# Проектная работа. МБОУ АЛГОСОШ им. Фибоначчи

В проектной работе реализован визуализатор алгоритмов, которые изучены в течение месяца. Эта проектная работа заточена на анимацию и поэтапное отображение работы алгоритма.

Подготовленный [дизайн проекта.](https://www.figma.com/file/RIkypcTQN5d37g7RRTFid0/Algososh_external_link?node-id=0%3A1).

Работа подобных сервисов по визуализации, [visualgo.net](https://visualgo.net/en). 

## Строка

На этом экране разворачивается строка.

**Компоненты**

Добавлены основные компоненты:

- инпут для ввода исходного текста для разворота;
- кнопка «Развернуть».

![Начальное состояние страницы](README_static/Untitled.png)

Начальное состояние страницы

Введите текст в инпут и нажмите развернуть. 

**Визуализация**

Сначала на экране появляется слово, буквы которого записаны в синие кружки.

![Строка в исходном виде](README_static/Untitled%201.png)

Строка в исходном виде

Два кандидата на сортировку подсвечиваются цветом `#D252E1`. Уже отсортированные элементы выделины `#7FE051`. 

На скриншоте показана строка, в которой поменяли местами крайние символы:

![Промежуточный этап разворота строки](README_static/Untitled%202.png)

Промежуточный этап разворота строки

Повторяются выделения, пока полностью не развернётся строка.

Анимация выполняться плавно. Для установки интервала использовано значение 1000 мс.

## Последовательность Фибоначчи

На этом экране сгенерировано `n` чисел последовательности Фибоначчи. 
**Компоненты**

Добавлены основные компоненты:

- инпут для ввода целого числа `n`;
- кнопка «Рассчитать», по клику на неё на экране отображается последовательность Фибоначчи до числа `n`.

![Начальное состояние страницы](README_static/Untitled%203.png)

Начальное состояние страницы

Например, вы ввели 4, тогда на экране появиться ряд 1, 1, 2, 3, 5. Ограничин ввод, в инпут можно вводить только положительные целые числа. И так как последовательность бесконечна, добавлена максимальная граница ввода 1 ≤ `n`≤ 19.

**Визуализация**

Элементы отображаются постепенно. Сначала появляется один, потом второй, третий и так до `n`. Пока ряд появился не полностью, добавлен лоадер на кнопку, чтобы избежать повторных кликов.

![Сгенерированная последовательность](README_static/Untitled%204.png)

Сгенерированная последовательность

Анимация выполнятся плавно. Для установки интервала использовано значение 500 мс.

---

## Сортировка массива

На этом экране визуализированы алгоритмы сортировки выбором и пузырьком

**Компоненты**

Добавлены основные компоненты:

- RadioInput для выбора способа сортировки (выбором и пузырьком). По умолчанию стоит значение «Выбор».
- Кнопка «По убыванию», по клику на неё элементы массива отсортировываются по убыванию, алгоритм сортировки выбираем тот, который указан в RadioInput.
- Кнопка «По возрастанию», по клику на неё элементы массива отсортировываются по возрастанию, алгоритм сортировки выбираем тот, который указан в RadioInput.
- Кнопка «Новый массив», по клику на неё функция `randomArr` генерирует новый массив.

Помимо компонентов управления, на странице отображаются элементы массива.

![Начальное состояние страницы](README_static/Untitled%205.png)

Начальное состояние страницы

Чтобы задать массив случайных чисел, написана функция `randomArr`. При написании учтино, что:

- массив состоит из целых чисел $[0; 100]$,
- минимальное количество элементов массива `minLen = 3`, максимальное `maxLen = 17`.

Сгенерированный массив отображается на странице. Максимальное значение элемента массива равно 100, это же значение является процентным соотношением высоты столбца. В качестве максимальной высоты считается 340px.

```tsx
// сгенерированный массив
const arr = [25, 50, 100];
// высоты элементов массива
// `${(340 * arr[i]) / 100}px`
['85px', '170px', '340px']
```

**Визуализация**

Когда вы нажмёте «По убыванию» или «По возрастанию», запускается процесс сортировки в зависимости от выбранного способа: выбором или пузырьком.

Для анимации сортировки добалены два цвета:

- `#D252E1` — элементы, которые сортируем;
- `#7FE051` — отсортированные элементы массива.

Пример сортировки выбором по возрастанию для массива `[2, 34, 17, 100, 50]`. Чтобы отсортировать элементы выбором, сначала надо найти минимальный элемент, поставить первым элементом в массив и так далее:

1. Два сравниваемых числа — 34 и 2 — нужно выделять цветом `#D252E1`.
2. Так как 2 меньше 34, с 34 удаляем выделение цветом, 2 остаётся выделен `#D252E1`;
3. Ищем, есть ли в массиве элемент меньше двойки. Претендентов на минимальный элемент по очереди выделяем цветом `#D252E1`. 
4. Так как 2 — минимальный элемент, меняем его местами с элементом 34 и выделяем цветом `#7FE051`.
5. Смещаемся на один индекс и продолжаем сортировку.

Добавлены лоадер на активную кнопку и дизейблены все остальные контролы, пока идёт анимация сортировки.

Сортировка массива выполняется плавно. Для установки интервала использовано значение 1000 мс.

---

## Стек

На этом экране визуализированы удаление и добавление элементов в структуру данных стек

**Компоненты**

Добавлены основные компоненты:

- Инпут для ввода значений, которые добавляют в стек. 
- Кнопкa «Добавить», по клику на неё вызывается метод стека `push(item)`.
- Кнопкa «Удалить», по клику на неё вызывается метод стека `pop()`.
- Кнопка «Очистить», по клику на неё сразу удаляются все элементы из стека.


![Начальное состояние страницы](README_static/Untitled%206.png)

Начальное состояние страницы

**Визуализация добавления** 

Если ввести в инпут значение и нажать «Добавить», в стеке появится первый элемент, который отрисовывается на странице.

Для отображения элементов стека используется компонент Circle. Внутри записано введённое значение, сверху компонента — указатель на вершину стека `top`, а снизу — номер индекса элемента (для первого элемента — `0` и так далее).

При добавлении ещё одного элемента справа от предыдущего появляется Circle с новым значением и индексом 1. И теперь уже над ним оказывается подпись `top`. В момент добавления на долю секунды подсвечивается новый элемент цветом `#D252E1`.

Если в инпуте нет числа, по клику на кнопку «Добавить» метод `push(item)` не вызывается.

**Визуализация удаления**

Если нажать «Удалить», из стека извлекается только верхний элемент. Удаляемый элемент выделяется цветом, надпись `top` перемещается на его левого соседа. 

Если в стеке всего один элемент, то после нажатия «Удалить» на странице не отображаются никакие элементы стека. 

По клику на кнопку «Очистить» из стека удаляются все элементы сразу.

При нажатии на кнопку отображается на ней лоадер, а остальные контролы дизейблются. Ограничен ввод значения до четырёх символов.

Все анимации на странице выполняться плавно. Для установки интервала использовано значение 500 мс.

---

## Очередь

На этом экране визуализированы удаление и добавление элементов в структуру данных «очередь».

**Компоненты**

Добавлены основные компоненты:

- инпут для ввода значений, которые добавляют в очередь;
- кнопкa «Добавить», по клику на неё вызывается метод очереди `enqueue(item)`;
- кнопкa «Удалить», по клику на неё вызывается метод очереди `dequeue()`;
- кнопка «Очистить», по клику на неё удалит все элементы из очереди;

![Начальное состояние страницы](README_static/Untitled%207.png)

Начальное состояние страницы

**Визуализация**

Если ввести в инпут значение 2 и нажать «Добавить», элемент отобразится под индексом 0. Также добавится на элемент указатели `head` и `tail`. Инпут при этом очищается.

![Очередь с одним элементом](README_static/Untitled%208.png)

Очередь с одним элементом

При добавлении элементов в очередь позиция tail смещаться, на долю секунды выделяется новый элемент цветом `#D252E1`.

![Очередь из трёх элементов в момент добавления](README_static/Untitled%209.png)

Очередь из трёх элементов в момент добавления

Если нажать «Удалить», из очереди извлечется элемент под индексом 0 (на долю секунды подсветится элемент `#D252E1`), a `head` будет перемещён на элемент с индексом 1.

![Очередь после `dequeue();`](README_static/Untitled%2010.png)

Очередь после `dequeue();`

Все анимации на странице выполняется плавно. Для установки интервала использовано значение 500 мс.

При нажатии на кнопку отображается на ней лоадер, а остальные контролы дизейблины. Ограничен ввод значения до четырёх символов.

---

## Связный список

На этом экране реализовано удаление и добавление элементов в связный список. 

**Компоненты**

Добавлены основные компоненты:

- инпут с плейсхолдером «Введите значение» для ввода значения `value`, которое добавляет в список;
- кнопка «Добавить в head», по клику на которую значение из инпута становится новой головой списка;
- кнопка «Добавить в tail», по клику на которую значение из инпута становится новым хвостом списка.

Для удаления элемента:

- кнопка «Удалить из head», по клику на которую удаляется первый элемент из списка;
- кнопка «Удалить из tail», по клику на которую удаляется последний элемент из списка.

Для удаления или добавления по индексу:

- инпут с плейсхолдером «Введите индекс» для ввода индекса `ind` элемента связного списка;
- кнопка «Добавить по индексу», по клику на которую значение из инпута `value` занимают в списке место под номером `ind`;
- кнопка «Удалить по индексу», по клику на которую удаляется `ind`-элемент из списка.

Кроме элементов управления, на странице отображаться небольшой связный список, например `0 → 34 → 8 → 1`.

![Начальное состояние страницы](README_static/Untitled%2011.png)

Начальное состояние страницы

### Визуализация

**При добавлении в head** элемент появляется над первым элементом вместо надписи head.

![Добавление в head](README_static/Untitled%2012.png)

Добавление в head

Затем он занимает первое место в списке и на долю секунды выделяется зелёным цветом. Теперь над новым элементом написано head, и он указывает на предыдущий head-элемент.

![Отображение нового элемента в head](README_static/Untitled%2013.png)

Отображение нового элемента в head

**При добавлении в tail** элемент появляется в хвосте над элементом с надписью tail. Затем он занимает последнее место в списке и на долю секунды выделяется зелёным цветом. Теперь под новым элементом написано tail.

**При добавлении элемента по индексу** должны быть заполнены два поля: «Введите значение» и «Введите индекс». Вся анимация выполняется поэтапно: 

- По клику на «Добавить по индексу» новый элемент отображается над первым элементом.
- Пока ищем нужный индекс, поочерёдно подсвечиваются элементы. Добавляемый элемент перепрыгивает по списку до искомого индекса.
- Когда индекс найден, отображается новый элемент над ним и добавляем.

В этом примере число 10 занимает индекс 2.

![Добавление по индексу. Поиск индекса](README_static/Untitled%2014.png)

Добавление по индексу. Поиск индекса

После успешного добавления 10 стоит под порядковым номером 2 и указывает на 34. Новый добавленный элемент выделите цветом.

![Добавление по индексу. Новый элемент в списке](README_static/Untitled%2015.png)

Добавление по индексу. Новый элемент в списке

**При удалении элемента по индексу** сначала выделяется цветом элементы, пока не достигнет нужного индекса. Затем очистит значение в элементе и снизу отобразит маленький кружок с удаляемым значением.

Например, вы ввели индекс 2 и нажали «Удалить по индексу». Сначала цветом выделяется элемент с индексом 0, потом с индексом 1, и когда дошли до нужного индекса, то удаляется элемент из связного списка:

![Удаление элемента под индексом 2](README_static/Untitled%2016.png)

Удаление элемента под индексом 2

**При удалении элемента из tail** кружок замещает надпись tail.

![Удаление элемента из tail](README_static/Untitled%2017.png)

Удаление элемента из tail

При добавлении, новый элемент отображается над элементами списка, а при удалении — под ними.

Все анимации на странице выполняются плавно. Для установки интервала использовано значение 500 мс.

Добавлен лоадер на активную кнопку и дизейблены все остальные контролы. Ограничен ввод значения до четырёх символов.
