const cityListName = {
    
    '東京':'Tokyo',
    '神奈川':'Kanagawa',
    '大阪':'Osaka',
    '札幌':'Sapporo',
    '横浜':'Yokohama',
    '川崎':'Kawasaki',
    '那須':'Nasu',
    '徳島':'Tokushima'
    
};

const cityListLatitude = {
    '東京':'35.6793133904226',
    '神奈川':'35.46603896720135',
    '大阪':'34.70257933120653',
    '札幌':'43.069135401570634',
    '横浜':'35.46603896720135',
    '川崎':'35.53140621774173',
    '那須':'36.931924026392515',
    '徳島':'34.07442278059921'
};

const cityListLongitude = {
    '東京':'139.76864288742652',
    '神奈川':'139.6203092578848',
    '大阪':'135.49367181894598',
    '札幌':'141.34767194429398',
    '横浜':'139.6203092578848',
    '川崎':'139.6962003297865',
    '那須':'140.01878026537656',
    '徳島':'134.54644569789315'
};

const conditionList = {
    'clear sky':'快晴',
    'few clouds':'晴れ',
    'scattered clouds':'くもり',
    'broken clouds':'くもり',
    'overcast clouds':'くもり',
    'light rain':'小雨',
    'rain':'雨',
    'moderate rain':'にわか雨',
    'heavy intensity': '大雨'
};

module.exports =  [
    cityListName,
    cityListLatitude,
    cityListLongitude,
    conditionList
];