'use strict';
const userNameInput    = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided    = document.getElementById('result-area');
const tweetDivided     = document.getElementById('tweet-area');

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if(userName.length === 0){
    return;
  }
  //表示を消す
  removeAllChildren(resultDivided);
  //診断結果の文章を作成する
  const result = assessment(userName);
  //ツイートボタンを作成して、表示する
  tweetDivided.innerText = '';
  const anchor = document.createElement('a');
  anchor.setAttribute('href', 'https://twitter.com/intent/tweet?button_hashtag=' + encodeURIComponent('あなたの良いところ診断') + '&ref_src=twsrc%5Etfw');
  anchor.className = 'twitter-hashtag-button';
  anchor.setAttribute('data-text', result);
  anchor.innerText = '#あなたの良いところ診断';
  tweetDivided.appendChild(anchor);

  const script = document.createElement('script');
  script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
  tweetDivided.appendChild(script)

  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);
};

const answers = [
  '{userName}のいいところは声です。{userName}の特徴的な声は皆を惹きつけ、心に残ります。',
  '{userName}のいいところはまなざしです。{userName}に見つめられた人は、気になって仕方がないでしょう。',
  '{userName}のいいところは情熱です。{userName}の情熱に周りの人は感化されます。',
  '{userName}のいいところは厳しさです。{userName}の厳しさがものごとをいつも成功に導きます。',
  '{userName}のいいところは知識です。博識な{userName}を多くの人が頼りにしています。',
  '{userName}のいいところはユニークさです。{userName}だけのその特徴が皆を楽しくさせます。',
  '{userName}のいいところは用心深さです。{userName}の洞察に、多くの人が助けられます。',
  '{userName}のいいところは見た目です。内側から溢れ出る{userName}の良さに皆が気を惹かれます。',
  '{userName}のいいところは決断力です。{userName}がする決断にいつも助けられる人がいます。',
  '{userName}のいいところは思いやりです。{userName}に気をかけてもらった多くの人が感謝しています。',
  '{userName}のいいところは感受性です。{userName}が感じたことに皆が共感し、わかりあうことができます。',
  '{userName}のいいところは節度です。強引すぎない{userName}の考えに皆が感謝しています。',
  '{userName}のいいところは好奇心です。新しいことに向かっていく{userName}の心構えが多くの人に魅力的に映ります。',
  '{userName}のいいところは気配りです。{userName}の配慮が多くの人を救っています。',
  '{userName}のいいところはその全てです。ありのままの{userName}自身がいいところなのです。',
  '{userName}のいいところは自制心です。やばいと思ったときにしっかりと衝動を抑えられる{userName}が皆から評価されています。',
  '{userName}のいいところは優しさです。あなたの優しい雰囲気や立ち振る舞いに多くの人が癒やされています。',
];

/**
 * 名前から、良いところ診断結果を返す関数です
 * @param {string} userName 診断する名前
 * @returns {string}
 */

function assessment(userName) {
  //文字の番号の合計値を求める
  let sumOfCharCode = 0;
  for(let i=0; i<userName.length; i++){
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }
  const index = sumOfCharCode % answers.length;
  let result = answers[index];
  result = result.replaceAll('{userName}',userName);
  return result;
}
/**
 * 指定したHTML要素の子要素を全て削除する関数
 * @param {HTMLelement} element 
 */
function removeAllChildren(element) {
  while(resultDivided.firstChild) {
    resultDivided.removeChild(resultDivided.firstChild);
  }
}

userNameInput.onkeydown = event => {
  if(event.key === 'Enter') {
    assessmentButton.onclick()
  }
};
