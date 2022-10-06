&emsp;

## **1-①. 天気予報  for Alexa**

　最初のイベントプログラムは、音声AIの定番アクションである天気予報です。このプロジェクトでは、以下のようなイベントをトリガーにプログラムが起動することを目指します。

---
- 午後から雨が降りそう　->　「今日は午後xx時頃から雨が降りそうです。傘の準備を・・・」
- 3日後の予報が晴れに変わった　->　「週末、xxの天気はどうやら崩れる心配はなさそうです。」

#### Note
　Alexa Developer Console、及びGoogleのApp Actionsはプロトタイプの音声プログラム構築に適した開発環境を提供しています。最初の数回は、この2つの環境を使い構築したイベントプログラムをテストしながら、必要要素の洗い出しと整理を進めていきます。

&emsp;

## **Agenda**

　具体的な作業工程は、以下の通りです。

---
1. 天気予報APIの選択
  - OpenWeatherMap
  - Yahoo 気象予報API
  ---
2. 基本codeの実装
  - []
  - []
---
3. 基本codeの動作テスト
  - []
  - []
---
4. トリガーの実装
  - []
  - []
---
5. トリガーの動作テスト
  - []
  - []

&emsp;

## **1. 天気予報APIの選択**

　天気予報のAPIについては、OpenWeatherMapとYahoo 気象予報APIの2つを使用します。予報の精度やAPIの仕様等については深く検証していませんが、使い勝手が悪いという印象は個人的にはありません。APIの詳細は、以下の各リンクをご参照ください。

- [OpenWeatherMap (https://openweathermap.org)](https://openweathermap.org)
- [Yahoo (https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/weather.html)](https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/weather.html)

### **OpenWeatherMap**

　OpneWeatherMapの無料APIで取得できる天気予報は、

&emsp;

### **Yahoo 気象予報API**

&emsp;

## **2. 基本codeの作成**

&emsp;

## **3. 基本codeの動作テスト**

　この時点で想定する基本動作は、通常の音声プログラムと同じものです。

---
- 音声input　=>　action（プログラム起動、天気情報取得、発話選択） =>　output（xxの天気は晴れ、予想最高・・・）
---

　ただ、●●条件分岐が正しく動作していることも確認したいので、以下の音声inputも合わせてテストします。

&emsp;

## **4. トリガーの実装**

&emsp;

## **5. トリガーの動作テスト**

　トリガー実装後の動作は、3.でテストしたものとは大きく異なります。

---
- 任意のtrigger（ex. 天気変化に関する通知） =>　action（トリガーによるプログラム起動） =>　output（午後は雨が降りそうです。傘の・・・）
---

&emsp;
