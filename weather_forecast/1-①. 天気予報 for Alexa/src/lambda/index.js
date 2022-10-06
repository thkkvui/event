const Alexa = require('ask-sdk-core');
const wholeList = require('./list')
const {
    getRequestType,
    getIntentName,
    getSlotValue,
    getDialogState
} = require('ask-sdk-core');
const axios = require('axios');

const api_id = 'xxx';

//time params
const ms_day = 1000 * 60 * 60 * 24;
const ms_hour = 1000 * 60 * 60;
const t = new Date();
const year = t.getFullYear();
const month = t.getMonth();
const day = t.getDate();
const hour = t.getHours();

const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
        const speakOutput = 'いつもご利用ありがとうございます。';
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt("どこの天気が知りたいですか？使い方がわからない場合は、ヘルプ、と言ってください。")
            .getResponse();
    }
};

const CurrentWeatherIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'CurrentWeatherIntent';
    },
    handle(handlerInput) {
        const cityValue = getSlotValue(handlerInput.requestEnvelope, 'city');
        const cityNameEN = Object.keys(wholeList[0]).reduce((acc, key) =>
        acc.replace(key, wholeList[0][key]), cityValue);

        function current_API() {
            return `https://api.openweathermap.org/data/2.5/weather?appid=${api_id}&q=${cityNameEN}&units=metric`
        }

        return axios.get(current_API())
            .then(function(response) {
                if (response.status === 200) {
                    const weather = response.data;
                    const weatherConditionJP = Object.keys(wholeList[3]).reduce((acc, key) =>
                    acc.replace(key, wholeList[3][key]), weather.weather[0].description);
                    const speakOutput = `現在の${weather.name}の天気は${weatherConditionJP}、気温は${Math.round(weather.main.temp)}℃です。`;

                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt('他に知りたい天気はありますか？終了する場合は、止めて、と言ってください。')
                        .getResponse();
                }
            })
            .catch(function(err) {
                console.error(err);
                return handlerInput.responseBuilder
                    .speak(`${cityValue}、の天気はAPIの仕様により、取得できません。もう一度、別の都市を指定してください。`)
                    .reprompt('他に知りたい天気はありますか？終了する場合は、止めて、と言ってください。')
                    .getResponse();
            })
    }
};

const A_WeatherIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'A_WeatherIntent';
    },
    handle(handlerInput) {
        const cityValue = getSlotValue(handlerInput.requestEnvelope, 'city');
        let dateValue = getSlotValue(handlerInput.requestEnvelope, 'date');
        if(isNaN(parseInt(dateValue))) {
            dateValue = year + "-" + (month + 1) + "-" + dateValue.substr(8,2);
        }

        //onecall api params
        const exclude = ["current","minutely","hourly","alerts"];
        const latitude = Object.keys(wholeList[1]).reduce((acc, key) =>
        acc.replace(key, wholeList[1][key]), cityValue);
        const longitude = Object.keys(wholeList[2]).reduce((acc, key) =>
        acc.replace(key, wholeList[2][key]), cityValue);

        //time params
        if(dateValue) {
            const date = new Date(dateValue);
            const today = new Date(year, month, day);
            const cnt = (date - today) / ms_day;
            const datetext = date.getDate() + "日";
            const datetext1 = date.getMonth() + 1 + "月" + datetext;

            function api_url() {
                return `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=${exclude}&appid=${api_id}&units=metric`;
            }

            return axios.get(api_url())
            .then(function(response) {
                if (response.status === 200) {
                    const weather = response.data.daily[cnt];
                    const weatherConditionJP = Object.keys(wholeList[3]).reduce((acc, key) =>
                    acc.replace(key, wholeList[3][key]), weather.weather[0].description);
                    const speakOutput = `${datetext}、${cityValue}の天気は${weatherConditionJP}、
                                        予想最高気温は${Math.round(weather.temp.max)}℃、予想最低気温は${Math.round(weather.temp.min)}℃です。`;
                    return handlerInput.responseBuilder
                        .speak(speakOutput)
                        .reprompt('他に知りたい天気はありますか？終了する場合は、止めて、と言ってください。')
                        .getResponse();
                }
            })
            .catch(function(err) {
                console.error(err);
                if(cnt>7) {
                    return handlerInput.responseBuilder
                        .speak(`${datetext1}、の天気はAPIの仕様により、取得できません。もう一度、1週間以内の日時を指定してください。`)
                        .reprompt('他に知りたい天気はありますか？終了する場合は、止めて、と言ってください')
                        .getResponse();
                }else{
                    return handlerInput.responseBuilder
                        .speak(`${cityValue}、の天気はAPIの仕様により、取得できません。もう一度、別の都市を指定してください。`)
                        .reprompt('他に知りたい天気はありますか？終了する場合は、止めて、と言ってください。')
                        .getResponse();
                }
            });
        }
    }
};


const ForeignCityIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'ForeignCityIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'このスキルは、海外の天気には対応していません。もう一度、今日の札幌の天気は?、のように質問してください。';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('他に知りたい天気はありますか？特になければ、セッションを終了します。')
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'このスキルは、日本国内、1週間先までの天気予報をお伝えします。例えば、今日の札幌の天気は?、のように質問してください。';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('どこの天気が知りたいですか？特になければ、セッションを終了します。')
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speakOutput = '良いいちにちかどうかは、自分の行動で変わります。今日もがんばりましょう！';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};


const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const speakOutput = 'このスキルでは、その内容にお答えできません。使い方がわからない場合は、ヘルプ、と言ってください。';

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('何もなければ、セッションを終了します。')
            .getResponse();
    }
};


const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        return handlerInput.responseBuilder.getResponse();
    }
};


const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `${intentName}が開始されました。`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('')
            .getResponse();
    }
};


const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const speakOutput = 'お手数ですが、もう一度お願いします。使い方がわからない場合は、ヘルプ、と言ってください。';
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt('何もなければ、セッションを終了します。')
            .getResponse();
    }
};


exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        CurrentWeatherIntentHandler,
        A_WeatherIntentHandler,
        ForeignCityIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler
    )
    .addErrorHandlers(
        ErrorHandler
    )
    .lambda();
