import { QuizQuestion } from './types';

export const SECRET_WORD = 'PROFESORA';
export const SECRET_WORD_HINT = 'Главное слово игры: преподавательница / учительница на испанском языке';

export const QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    spanish: 'Yo ___ profesora de español.',
    russian: 'Я преподаватель испанского языка.',
    options: [
      { id: 'A', text: 'estoy', translation: 'нахожусь (глагол estar)' },
      { id: 'B', text: 'soy', translation: 'являюсь (глагол ser - профессия)' },
      { id: 'C', text: 'tengo', translation: 'имею (глагол tener)' },
      { id: 'D', text: 'hay', translation: 'имеется / есть (глагол haber)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол SER (профессия)',
    explanation: 'Для указания профессии и постоянного статуса используется глагол ser: «Yo soy profesora» (Я преподавательница).'
  },
  {
    id: 2,
    spanish: 'Pablo ___ en la escuela ahora.',
    russian: 'Пабло сейчас в школе.',
    options: [
      { id: 'A', text: 'es', translation: 'является (ser)' },
      { id: 'B', text: 'está', translation: 'находится (estar - местонахождение)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол ESTAR (местонахождение)',
    explanation: 'Для обозначения местонахождения человека или предмета всегда используется estar: «Pablo está en la escuela».'
  },
  {
    id: 3,
    spanish: 'Mis amigos ___ de Madrid.',
    russian: 'Мои друзья из Мадрида.',
    options: [
      { id: 'A', text: 'están', translation: 'находятся (estar)' },
      { id: 'B', text: 'son', translation: 'являются родом (ser de...)' },
      { id: 'C', text: 'tienen', translation: 'имеют (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол SER (происхождение)',
    explanation: 'Происхождение (откуда человек родом) выражается конструкцией «ser de»: «Mis amigos son de Madrid».'
  },
  {
    id: 4,
    spanish: 'La mochila ___ debajo de la mesa.',
    russian: 'Рюкзак находится под столом.',
    options: [
      { id: 'A', text: 'es', translation: 'является (ser)' },
      { id: 'B', text: 'está', translation: 'находится (estar)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол ESTAR (положение в пространстве)',
    explanation: 'Расположение предметов в пространстве (debajo de la mesa — под столом) передаётся глаголом estar: «La mochila está...».'
  },
  {
    id: 5,
    spanish: 'Mi hermana ___ muy simpática y tranquila.',
    russian: 'Моя сестра очень приятная и спокойная.',
    options: [
      { id: 'A', text: 'está', translation: 'находится / временное состояние (estar)' },
      { id: 'B', text: 'es', translation: 'является (ser - характер)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол SER (черты характера)',
    explanation: 'Постоянные качества личности и черты характера передаются с помощью глагола ser: «Mi hermana es muy simpática...».'
  },
  {
    id: 6,
    spanish: 'Hoy nosotros ___ muy cansados.',
    russian: 'Сегодня мы очень уставшие.',
    options: [
      { id: 'A', text: 'somos', translation: 'являемся по натуре (ser)' },
      { id: 'B', text: 'estamos', translation: 'чувствуем себя / сейчас (estar)' },
      { id: 'C', text: 'tenemos', translation: 'имеем (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол ESTAR (физическое состояние)',
    explanation: 'Усталость (cansados) — это временное физическое состояние, поэтому используется estar: «Hoy nosotros estamos muy cansados».'
  },
  {
    id: 7,
    spanish: 'Madrid ___ la capital de España.',
    russian: 'Мадрид — столица Испании.',
    options: [
      { id: 'A', text: 'está', translation: 'находится (estar)' },
      { id: 'B', text: 'es', translation: 'является (ser - определение)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол SER (сущность и определение)',
    explanation: 'Утверждение о том, чем является город («столицей»), требует ser: «Madrid es la capital de España».'
  },
  {
    id: 8,
    spanish: 'La puerta ___ abierta.',
    russian: 'Дверь открыта.',
    options: [
      { id: 'A', text: 'es', translation: 'является (ser)' },
      { id: 'B', text: 'está', translation: 'находится в состоянии (estar)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол ESTAR (состояние предмета)',
    explanation: 'Открытое состояние двери (abierta) — это результат действия и текущее состояние, используется estar: «está abierta».'
  },
  {
    id: 9,
    spanish: 'Este libro ___ muy interesante.',
    russian: 'Эта книга очень интересная.',
    options: [
      { id: 'A', text: 'está', translation: 'находится (estar)' },
      { id: 'B', text: 'es', translation: 'является (ser - неотъемлемое свойство)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол SER (свойства предметов)',
    explanation: 'Характеристика содержания книги («интересная») выражается через ser: «Este libro es muy interesante».'
  },
  {
    id: 10,
    spanish: 'Mis padres ___ en casa.',
    russian: 'Мои родители дома.',
    options: [
      { id: 'A', text: 'son', translation: 'являются (ser)' },
      { id: 'B', text: 'están', translation: 'находятся (estar en casa)' },
      { id: 'C', text: 'tienen', translation: 'имеют (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется (hay)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол ESTAR (местонахождение)',
    explanation: 'Быть дома (estar en casa) — местонахождение: для множественного числа (mis padres) форма «están».'
  },
  {
    id: 11,
    spanish: 'A mí me ___ mucho el chocolate.',
    russian: 'Мне очень нравится шоколад.',
    options: [
      { id: 'A', text: 'gustan', translation: 'нравятся (для мн. числа)' },
      { id: 'B', text: 'gusta', translation: 'нравится (для ед. числа)' },
      { id: 'C', text: 'gusto', translation: 'я нравлюсь' },
      { id: 'D', text: 'tengo', translation: 'я имею' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол GUSTAR (ед. число)',
    explanation: 'Подлежащее «el chocolate» стоит в единственном числе, поэтому форма глагола gustar — «gusta».'
  },
  {
    id: 12,
    spanish: 'A Pablo le ___ los deportes.',
    russian: 'Пабло нравятся виды спорта.',
    options: [
      { id: 'A', text: 'gusta', translation: 'нравится (ед. ч.)' },
      { id: 'B', text: 'gustan', translation: 'нравятся (мн. ч.)' },
      { id: 'C', text: 'tiene', translation: 'имеет' },
      { id: 'D', text: 'está', translation: 'находится' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол GUSTAR (мн. число)',
    explanation: 'Подлежащее «los deportes» стоит во множественном числе, поэтому требуется форма «gustan».'
  },
  {
    id: 13,
    spanish: 'A nosotros nos ___ viajar.',
    russian: 'Нам нравится путешествовать.',
    options: [
      { id: 'A', text: 'gustan', translation: 'нравятся (мн. ч.)' },
      { id: 'B', text: 'gusta', translation: 'нравится (с инфинитивом)' },
      { id: 'C', text: 'gustamos', translation: 'мы нравимся' },
      { id: 'D', text: 'tenemos', translation: 'мы имеем' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол GUSTAR с инфинитивом',
    explanation: 'Когда после gustar идёт глагол в инфинитиве (viajar — путешествовать), всегда используется форма единственного числа: «gusta».'
  },
  {
    id: 14,
    spanish: '¿Te ___ esta canción?',
    russian: 'Тебе нравится эта песня?',
    options: [
      { id: 'A', text: 'gustan', translation: 'нравятся (мн. ч.)' },
      { id: 'B', text: 'gusta', translation: 'нравится (ед. ч.)' },
      { id: 'C', text: 'gustas', translation: 'ты нравишься' },
      { id: 'D', text: 'tienes', translation: 'ты имеешь' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол GUSTAR (вопрос)',
    explanation: 'Песня «esta canción» одна (ед. число), значит выбираем «gusta»: «¿Te gusta esta canción?».'
  },
  {
    id: 15,
    spanish: 'A María le ___ los gatos y los perros.',
    russian: 'Марии нравятся кошки и собаки.',
    options: [
      { id: 'A', text: 'gusta', translation: 'нравится (ед. ч.)' },
      { id: 'B', text: 'gustan', translation: 'нравятся (мн. ч.)' },
      { id: 'C', text: 'está', translation: 'находится' },
      { id: 'D', text: 'tiene', translation: 'имеет' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол GUSTAR (несколько предметов)',
    explanation: '«Los gatos y los perros» вместе образуют множественное число предметов, поэтому форма — «gustan».'
  },
  {
    id: 16,
    spanish: 'No me ___ levantarme temprano.',
    russian: 'Мне не нравится рано вставать.',
    options: [
      { id: 'A', text: 'gustan', translation: 'нравятся (мн. ч.)' },
      { id: 'B', text: 'gusta', translation: 'нравится (с инфинитивом)' },
      { id: 'C', text: 'gusto', translation: 'я нравлюсь' },
      { id: 'D', text: 'tengo', translation: 'я имею' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Отрицание с GUSTAR + инфинитив',
    explanation: 'Перед инфинитивом «levantarme» используется единственное число: «No me gusta levantarme temprano».'
  },
  {
    id: 17,
    spanish: '¿Os ___ las películas españolas?',
    russian: 'Вам нравятся испанские фильмы?',
    options: [
      { id: 'A', text: 'gusta', translation: 'нравится (ед. ч.)' },
      { id: 'B', text: 'gustan', translation: 'нравятся (мн. ч.)' },
      { id: 'C', text: 'gustáis', translation: 'вы нравитесь' },
      { id: 'D', text: 'tenéis', translation: 'вы имеете' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол GUSTAR (местоимение os)',
    explanation: '«Las películas» — во множественном числе, согласуется с глаголом: «¿Os gustan las películas españolas?».'
  },
  {
    id: 18,
    spanish: 'Yo ___ dos hermanos.',
    russian: 'У меня два брата.',
    options: [
      { id: 'A', text: 'soy', translation: 'я являюсь (ser)' },
      { id: 'B', text: 'estoy', translation: 'я нахожусь (estar)' },
      { id: 'C', text: 'tengo', translation: 'у меня есть / я имею (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Глагол TENER (обладание и семья)',
    explanation: 'Наличие родственников выражается глаголом tener: «Yo tengo dos hermanos» (У меня есть два брата).'
  },
  {
    id: 19,
    spanish: 'Pablo ___ doce años.',
    russian: 'Пабло двенадцать лет.',
    options: [
      { id: 'A', text: 'es', translation: 'является (ser)' },
      { id: 'B', text: 'está', translation: 'находится (estar)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener años)' },
      { id: 'D', text: 'hay', translation: 'имеется' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Глагол TENER (возраст)',
    explanation: 'Возраст в испанском языке передаётся через глагол tener: «Pablo tiene doce años» (Пабло имеет 12 лет).'
  },
  {
    id: 20,
    spanish: 'Nosotros ___ mucha hambre.',
    russian: 'Мы очень голодны.',
    options: [
      { id: 'A', text: 'somos', translation: 'мы являемся (ser)' },
      { id: 'B', text: 'tenemos', translation: 'мы испытываем / имеем (tener hambre)' },
      { id: 'C', text: 'estamos', translation: 'мы находимся (estar)' },
      { id: 'D', text: 'hay', translation: 'имеется' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Глагол TENER (физиологические ощущения)',
    explanation: 'Чувство голода выражается фразой «tener hambre»: «Nosotros tenemos mucha hambre».'
  },
  {
    id: 21,
    spanish: 'Ana ___ una bicicleta nueva.',
    russian: 'У Анны есть новый велосипед.',
    options: [
      { id: 'A', text: 'es', translation: 'является (ser)' },
      { id: 'B', text: 'está', translation: 'находится (estar)' },
      { id: 'C', text: 'tiene', translation: 'имеет (tener)' },
      { id: 'D', text: 'hay', translation: 'имеется' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Глагол TENER (владение предметом)',
    explanation: 'Обладание предметом в 3-м лице ед. числа: «Ana tiene una bicicleta nueva».'
  },
  {
    id: 22,
    spanish: '¿Tú ___ tiempo ahora?',
    russian: 'У тебя сейчас есть время?',
    options: [
      { id: 'A', text: 'eres', translation: 'ты являешься (ser)' },
      { id: 'B', text: 'estás', translation: 'ты находишься (estar)' },
      { id: 'C', text: 'tienes', translation: 'ты имеешь (tener tiempo)' },
      { id: 'D', text: 'hay', translation: 'имеется' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Глагол TENER (время)',
    explanation: '«Иметь время» = «tener tiempo». Форма для tú: «¿Tú tienes tiempo ahora?».'
  },
  {
    id: 23,
    spanish: 'Mis amigos ___ mucha suerte.',
    russian: 'Моим друзьям очень везёт.',
    options: [
      { id: 'A', text: 'son', translation: 'являются (ser)' },
      { id: 'B', text: 'están', translation: 'находятся (estar)' },
      { id: 'C', text: 'tienen', translation: 'имеют удачу (tener suerte)' },
      { id: 'D', text: 'hay', translation: 'имеется' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Глагол TENER (устойчивые выражения)',
    explanation: '«Tener suerte» означает «быть везучим / иметь удачу». Для mis amigos: «tienen suerte».'
  },
  {
    id: 24,
    spanish: 'Yo ___ frío hoy.',
    russian: 'Мне сегодня холодно.',
    options: [
      { id: 'A', text: 'soy', translation: 'я холодный по натуре' },
      { id: 'B', text: 'estoy', translation: 'я нахожусь' },
      { id: 'C', text: 'tengo', translation: 'я испытываю холод (tener frío)' },
      { id: 'D', text: 'hay', translation: 'имеется' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Глагол TENER (ощущение холода)',
    explanation: 'Ощущение холода выражается через «tener frío»: «Yo tengo frío hoy» (Мне холодно сегодня).'
  },
  {
    id: 25,
    spanish: 'Yo ___ estudiar para el examen.',
    russian: 'Я должен учиться к экзамену.',
    options: [
      { id: 'A', text: 'hay que', translation: 'нужно (безличное)' },
      { id: 'B', text: 'tengo que', translation: 'я должен (личное tener que)' },
      { id: 'C', text: 'soy', translation: 'я являюсь' },
      { id: 'D', text: 'estoy', translation: 'я нахожусь' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'TENER QUE (личное обязательство)',
    explanation: 'Когда субъект указан конкретно («Yo»), используется конструкция «tener que + инфинитив»: «Yo tengo que estudiar».'
  },
  {
    id: 26,
    spanish: 'Pablo ___ hacer los deberes.',
    russian: 'Пабло должен сделать домашнее задание.',
    options: [
      { id: 'A', text: 'hay que', translation: 'нужно (безличное)' },
      { id: 'B', text: 'tiene que', translation: 'он должен (tener que)' },
      { id: 'C', text: 'está que', translation: 'неверная форма' },
      { id: 'D', text: 'es que', translation: 'дело в том, что' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'TENER QUE (3-е лицо ед. ч.)',
    explanation: 'Личная обязанность Пабло: «Pablo tiene que hacer los deberes».'
  },
  {
    id: 27,
    spanish: 'Nosotros ___ comprar comida.',
    russian: 'Мы должны купить продукты.',
    options: [
      { id: 'A', text: 'tenemos que', translation: 'мы должны (личное nosotros)' },
      { id: 'B', text: 'hay que', translation: 'нужно (безличное)' },
      { id: 'C', text: 'somos que', translation: 'неверная форма' },
      { id: 'D', text: 'estamos que', translation: 'неверная форма' },
    ],
    correctAnswer: 'A',
    grammarTopic: 'TENER QUE (1-е лицо мн. ч.)',
    explanation: 'Для «nosotros» правильная форма личного долга: «Nosotros tenemos que comprar comida».'
  },
  {
    id: 28,
    spanish: 'Tú ___ levantarte temprano mañana.',
    russian: 'Ты должен завтра рано встать.',
    options: [
      { id: 'A', text: 'tienes que', translation: 'ты должен (tú)' },
      { id: 'B', text: 'hay que', translation: 'нужно (безличное)' },
      { id: 'C', text: 'estás', translation: 'ты находишься' },
      { id: 'D', text: 'eres', translation: 'ты являешься' },
    ],
    correctAnswer: 'A',
    grammarTopic: 'TENER QUE (2-е лицо ед. ч.)',
    explanation: 'Обращение к собеседнику «tú»: «Tú tienes que levantarte temprano mañana».'
  },
  {
    id: 29,
    spanish: 'Para aprender español, ___ practicar mucho.',
    russian: 'Чтобы выучить испанский, нужно много практиковаться.',
    options: [
      { id: 'A', text: 'tiene que', translation: 'он должен (личное)' },
      { id: 'B', text: 'hay que', translation: 'нужно / следует вообще (безличное)' },
      { id: 'C', text: 'está', translation: 'находится' },
      { id: 'D', text: 'hay', translation: 'имеется (без que)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'HAY QUE (безличное «нужно / надо»)',
    explanation: 'Общее правило для всех людей без конкретного лица формулируется через безличное «hay que + inf»: «hay que practicar».'
  },
  {
    id: 30,
    spanish: 'En clase ___ escuchar al profesor.',
    russian: 'На уроке нужно слушать учителя.',
    options: [
      { id: 'A', text: 'tienes que', translation: 'ты должен' },
      { id: 'B', text: 'hay que', translation: 'надо / нужно (общее правило)' },
      { id: 'C', text: 'hay', translation: 'есть (без que)' },
      { id: 'D', text: 'está', translation: 'находится' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'HAY QUE (общее правило поведения)',
    explanation: 'Общее требование дисциплины для всех в классе: «En clase hay que escuchar al profesor».'
  },
  {
    id: 31,
    spanish: 'Para conducir bien ___ tener cuidado.',
    russian: 'Чтобы хорошо водить машину, нужно быть осторожным.',
    options: [
      { id: 'A', text: 'hay que', translation: 'необходимо / нужно (безличное)' },
      { id: 'B', text: 'tiene que', translation: 'он должен' },
      { id: 'C', text: 'hay', translation: 'есть' },
      { id: 'D', text: 'está', translation: 'находится' },
    ],
    correctAnswer: 'A',
    grammarTopic: 'HAY QUE (общее условие)',
    explanation: 'Общая рекомендация для любого водителя: «hay que tener cuidado» (нужно быть внимательным).'
  },
  {
    id: 32,
    spanish: 'En la mesa ___ tres libros.',
    russian: 'На столе есть три книги.',
    options: [
      { id: 'A', text: 'están', translation: 'находятся (конкретные книги)' },
      { id: 'B', text: 'son', translation: 'являются' },
      { id: 'C', text: 'hay', translation: 'имеется / лежат (наличие количества)' },
      { id: 'D', text: 'tienen', translation: 'имеют' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'HAY (наличие с числительными)',
    explanation: 'С неопределённым количеством или числительными (tres libros) для выражения наличия используется безличная форма «hay».'
  },
  {
    id: 33,
    spanish: 'En mi clase ___ veinte alumnos.',
    russian: 'В моём классе двадцать учеников.',
    options: [
      { id: 'A', text: 'son', translation: 'являются' },
      { id: 'B', text: 'están', translation: 'находятся' },
      { id: 'C', text: 'hay', translation: 'имеется / есть (наличие)' },
      { id: 'D', text: 'tienen', translation: 'имеют' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'HAY (число участников)',
    explanation: '«En mi clase hay veinte alumnos» — констатация наличия 20 учеников.'
  },
  {
    id: 34,
    spanish: 'En esta ciudad ___ muchos parques.',
    russian: 'В этом городе много парков.',
    options: [
      { id: 'A', text: 'hay', translation: 'есть / имеются (наличие с muchos)' },
      { id: 'B', text: 'están', translation: 'находятся' },
      { id: 'C', text: 'son', translation: 'являются' },
      { id: 'D', text: 'tienen', translation: 'имеют' },
    ],
    correctAnswer: 'A',
    grammarTopic: 'HAY со словом muchos',
    explanation: 'Перед словом «muchos/muchas» для констатации существования всегда используется «hay»: «hay muchos parques».'
  },
  {
    id: 35,
    spanish: 'En la habitación ___ una cama y dos sillas.',
    russian: 'В комнате есть одна кровать и два стула.',
    options: [
      { id: 'A', text: 'están', translation: 'находятся' },
      { id: 'B', text: 'hay', translation: 'имеется (с неопределённым una)' },
      { id: 'C', text: 'son', translation: 'являются' },
      { id: 'D', text: 'tiene', translation: 'имеет' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'HAY с неопределённым артиклем',
    explanation: 'С неопределённым артиклем «una cama» используется глагол «hay»: «En la habitación hay una cama...».'
  },
  {
    id: 36,
    spanish: 'En una semana ___ siete días.',
    russian: 'В неделе семь дней.',
    options: [
      { id: 'A', text: 'está', translation: 'находится' },
      { id: 'B', text: 'tiene', translation: 'имеет' },
      { id: 'C', text: 'hay', translation: 'есть / содержится (наличие)' },
      { id: 'D', text: 'son', translation: 'являются' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'HAY (наличие элементов во временном отрезке)',
    explanation: 'Факт наличия количества дней в неделе: «En una semana hay siete días».'
  },
  {
    id: 37,
    spanish: 'En un año ___ doce meses.',
    russian: 'В году двенадцать месяцев.',
    options: [
      { id: 'A', text: 'son', translation: 'являются' },
      { id: 'B', text: 'hay', translation: 'есть / насчитывается' },
      { id: 'C', text: 'están', translation: 'находятся' },
      { id: 'D', text: 'tiene', translation: 'имеет' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'HAY (наличие месяцев)',
    explanation: 'Утверждение о количестве месяцев: «En un año hay doce meses».'
  },
  {
    id: 38,
    spanish: 'Tengo diez euros y mi madre me da cinco. Ahora tengo ___.',
    russian: 'У меня 10 евро, мама даёт мне ещё 5. Теперь у меня...',
    options: [
      { id: 'A', text: 'doce', translation: 'двенадцать (12)' },
      { id: 'B', text: 'quince', translation: 'пятнадцать (15)' },
      { id: 'C', text: 'veinte', translation: 'двадцать (20)' },
      { id: 'D', text: 'cinco', translation: 'пять (5)' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Числительные: сложение (10 + 5)',
    explanation: '10 (diez) + 5 (cinco) = 15 (quince). Правильный ответ: «quince».'
  },
  {
    id: 39,
    spanish: 'Hay veinte alumnos. Diez son chicos y diez son ___.',
    russian: 'Есть двадцать учеников. Десять мальчиков и десять...',
    options: [
      { id: 'A', text: 'doce', translation: 'двенадцать' },
      { id: 'B', text: 'niñas', translation: 'девочки' },
      { id: 'C', text: 'veinte', translation: 'двадцать' },
      { id: 'D', text: 'cinco', translation: 'пять' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Лексика и числа: chicos / niñas',
    explanation: 'Если из 20 учеников 10 мальчики (chicos), то остальные 10 — девочки (niñas).'
  },
  {
    id: 40,
    spanish: 'Tengo ocho manzanas y como tres. Me quedan ___.',
    russian: 'У меня восемь яблок, я съедаю три. Остаётся...',
    options: [
      { id: 'A', text: 'cinco', translation: 'пять (5)' },
      { id: 'B', text: 'seis', translation: 'шесть (6)' },
      { id: 'C', text: 'siete', translation: 'семь (7)' },
      { id: 'D', text: 'once', translation: 'одиннадцать (11)' },
    ],
    correctAnswer: 'A',
    grammarTopic: 'Числительные: вычитание (8 - 3)',
    explanation: '8 (ocho) минус 3 (tres) равно 5 (cinco): «Me quedan cinco».'
  },
  {
    id: 41,
    spanish: '¿___ te llamas?',
    russian: 'Как тебя зовут?',
    options: [
      { id: 'A', text: 'Qué', translation: 'Что' },
      { id: 'B', text: 'Cómo', translation: 'Как (¿Cómo te llamas?)' },
      { id: 'C', text: 'Dónde', translation: 'Где' },
      { id: 'D', text: 'Cuál', translation: 'Какой / который' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Вопросительные слова: CÓMO',
    explanation: 'Стандартный вопрос для знакомства: «¿Cómo te llamas?» (Как тебя зовут?).'
  },
  {
    id: 42,
    spanish: '¿___ vives?',
    russian: 'Где ты живёшь?',
    options: [
      { id: 'A', text: 'Adónde', translation: 'Куда' },
      { id: 'B', text: 'De dónde', translation: 'Откуда' },
      { id: 'C', text: 'Dónde', translation: 'Где (место)' },
      { id: 'D', text: 'Cuándo', translation: 'Когда' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Вопросительные слова: DÓNDE',
    explanation: 'Для вопроса о месте постоянного проживания используется «Dónde»: «¿Dónde vives?» (Где ты живёшь?).'
  },
  {
    id: 43,
    spanish: '¿___ eres? — Soy de Armenia.',
    russian: 'Откуда ты? — Я из Армении.',
    options: [
      { id: 'A', text: 'Dónde', translation: 'Где' },
      { id: 'B', text: 'De dónde', translation: 'Откуда (происхождение)' },
      { id: 'C', text: 'Adónde', translation: 'Куда' },
      { id: 'D', text: 'Cómo', translation: 'Как' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Вопросительные слова: DE DÓNDE',
    explanation: 'Ответ «Soy de...» указывает на вопрос об источнике/происхождении: «¿De dónde eres?» (Откуда ты?).'
  },
  {
    id: 44,
    spanish: '¿___ vas después de clase? — Voy a casa.',
    russian: 'Куда ты идёшь после урока? — Я иду домой.',
    options: [
      { id: 'A', text: 'De dónde', translation: 'Откуда' },
      { id: 'B', text: 'Dónde', translation: 'Где' },
      { id: 'C', text: 'Adónde', translation: 'Куда (направление движения)' },
      { id: 'D', text: 'Qué', translation: 'Что' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Вопросительные слова: ADÓNDE',
    explanation: 'С глаголом движения (ir / vas) вопрос о направлении звучит как «Adónde»: «¿Adónde vas...?» (Куда ты идёшь?).'
  },
  {
    id: 45,
    spanish: '¿___ es tu profesor de español? — El señor López.',
    russian: 'Кто твой учитель испанского? — Сеньор Лопес.',
    options: [
      { id: 'A', text: 'Qué', translation: 'Что' },
      { id: 'B', text: 'Quién', translation: 'Кто (о человеке)' },
      { id: 'C', text: 'Dónde', translation: 'Где' },
      { id: 'D', text: 'Cuál', translation: 'Который' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Вопросительные слова: QUIÉN',
    explanation: 'Вопрос о личности человека требует вопросительного слова «Quién»: «¿Quién es tu profesor...?».'
  },
  {
    id: 46,
    spanish: '¿___ haces por la mañana? — Estudio español.',
    russian: 'Что ты делаешь утром? — Я учу испанский.',
    options: [
      { id: 'A', text: 'Qué', translation: 'Что (действие / предмет)' },
      { id: 'B', text: 'Cuál', translation: 'Который' },
      { id: 'C', text: 'Quién', translation: 'Кто' },
      { id: 'D', text: 'Cuándo', translation: 'Когда' },
    ],
    correctAnswer: 'A',
    grammarTopic: 'Вопросительные слова: QUÉ',
    explanation: 'Вопрос «Что ты делаешь?» строится со словом «Qué»: «¿Qué haces por la mañana?».'
  },
  {
    id: 47,
    spanish: '¿___ de estos libros prefieres?',
    russian: 'Какую из этих книг ты предпочитаешь?',
    options: [
      { id: 'A', text: 'Qué', translation: 'Что (не употребляется перед de)' },
      { id: 'B', text: 'Cuál', translation: 'Который / Какую (выбор из множества с de)' },
      { id: 'C', text: 'Quién', translation: 'Кто' },
      { id: 'D', text: 'Dónde', translation: 'Где' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Вопросительные слова: CUÁL DE...',
    explanation: 'При выборе одного варианта из предложенного списка с предлогом «de» используется «Cuál»: «¿Cuál de estos libros...?».'
  },
  {
    id: 48,
    spanish: '¿___ tienes clase de español? — El lunes.',
    russian: 'Когда у тебя урок испанского? — В понедельник.',
    options: [
      { id: 'A', text: 'Cómo', translation: 'Как' },
      { id: 'B', text: 'Dónde', translation: 'Где' },
      { id: 'C', text: 'Cuándo', translation: 'Когда (время события)' },
      { id: 'D', text: 'Cuánto', translation: 'Сколько' },
    ],
    correctAnswer: 'C',
    grammarTopic: 'Вопросительные слова: CUÁNDO',
    explanation: 'Вопрос о дне или времени («El lunes» — в понедельник) задаётся словом «Cuándo»: «¿Cuándo tienes clase...?».'
  },
  {
    id: 49,
    spanish: '¿___ hermanos tienes? — Tengo dos.',
    russian: 'Сколько у тебя братьев? — У меня два.',
    options: [
      { id: 'A', text: 'Cuánto', translation: 'Сколько (муж. род ед. ч.)' },
      { id: 'B', text: 'Cuántos', translation: 'Сколько (муж. род мн. ч.)' },
      { id: 'C', text: 'Cuánta', translation: 'Сколько (жен. род ед. ч.)' },
      { id: 'D', text: 'Cuáles', translation: 'Какие / которые' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Вопросительные слова: CUÁNTOS',
    explanation: 'Существительное «hermanos» мужского рода множественного числа, поэтому согласуется форма «Cuántos».'
  },
  {
    id: 50,
    spanish: '¿___ estudias español? — Porque quiero vivir en España.',
    russian: 'Почему ты учишь испанский? — Потому что хочу жить в Испании.',
    options: [
      { id: 'A', text: 'Para qué', translation: 'Для чего' },
      { id: 'B', text: 'Por qué', translation: 'Почему / по какой причине' },
      { id: 'C', text: 'Cómo', translation: 'Как' },
      { id: 'D', text: 'Cuándo', translation: 'Когда' },
    ],
    correctAnswer: 'B',
    grammarTopic: 'Вопросительные слова: POR QUÉ',
    explanation: 'Вопрос «Почему?» пишется раздельно с ударением «Por qué», а ответ «Потому что» пишется слитно «Porque».'
  }
];

export const WHEEL_SECTORS = [
  { id: 1, label: '500', type: 'points', value: 500, color: '#f59e0b', textColor: '#1e1b4b' },
  { id: 2, label: '+', sublabel: 'БУКВА', type: 'plus', value: 300, color: '#10b981', textColor: '#ffffff' },
  { id: 3, label: '250', type: 'points', value: 250, color: '#3b82f6', textColor: '#ffffff' },
  { id: 4, label: 'x2', sublabel: 'УДВОЕНИЕ', type: 'multiplier', value: 2, color: '#8b5cf6', textColor: '#ffffff' },
  { id: 5, label: '750', type: 'points', value: 750, color: '#ec4899', textColor: '#ffffff' },
  { id: 6, label: 'ПРИЗ', sublabel: 'БОНУС', type: 'prize', value: 1000, color: '#eab308', textColor: '#1e1b4b' },
  { id: 7, label: '400', type: 'points', value: 400, color: '#06b6d4', textColor: '#ffffff' },
  { id: 8, label: '1000', type: 'points', value: 1000, color: '#f97316', textColor: '#ffffff' },
  { id: 9, label: '+', sublabel: 'БУКВА', type: 'plus', value: 300, color: '#10b981', textColor: '#ffffff' },
  { id: 10, label: '600', type: 'points', value: 600, color: '#6366f1', textColor: '#ffffff' },
  { id: 11, label: '1500', type: 'points', value: 1500, color: '#d946ef', textColor: '#ffffff' },
  { id: 12, label: '2000', sublabel: 'ДЖЕКПОТ', type: 'points', value: 2000, color: '#ef4444', textColor: '#ffffff' },
] as const;
