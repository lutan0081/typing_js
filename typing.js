// 必要なHTML要素の取得
const wrap = document.getElementById('wrap');

const start = document.getElementById('start');

//テキストの配列作成
const textLists = [
        'Hello World','This is my App','How are you?',
        'Today is sunny','I love JavaScript!','Good morning',
        'I am Japanese','Let it be','Samurai',
        'Typing Game','Information Technology',
        'I want to be a programmer','What day is today?',
        'I want to build a web app','Nice to meet you',
        'Chrome Firefox Edge Safari','machine learning',
        'Brendan Eich','John Resig','React Vue Angular',
        'Netscape Communications','undefined null NaN',
        'Thank you very much','Google Apple Facebook Amazon',
        'ECMAScript','console.log','for while if switch',
        'var let const','Windows Mac Linux iOS Android',
        'programming'
    ];

    
//新しい配列を作成
let checkTexts = [];


//問題テキスト表示
const createText = () => {
    
    //p要素取得
    const p = document.getElementById('text');
    
    // 配列のインデックス数からランダムな数値を生成する
    const rnd = Math.floor(Math.random() * textLists.length);
    
        //初期化
    p.textContent = '';
    
    
    //map()新しい配列を生成し、checkTextsに値を入れる
    checkTexts = textLists[rnd].split('').map(value =>{
        
        // span要素を生成あ
        const span = document.createElement('span')
        
        // span要素(html)に配列の1文字ずつを当てはめる
        span.textContent = value;
        
        //一度要素に入れてから値を入れない場合エラーになる
        //pの要素に入れる(1文字ずつ)
        p.appendChild(span);
        
        //returnでcheckTextsに入れる
        return span;
    });
    
    // const rnd = Math.floor(Math.random() * textLists.length);
    
    // p.textContent = textLists[0];
}; 


//スタートボタンの処理
start.addEventListener('click', () => {
    start.style.display = 'none';
    
    
    //秒数カウントの処理
    timer();
    
    //テキスト作成の関数
    createText();
    
     // キーボードのイベント処理
    document.addEventListener('keydown', KeyDown);
  
}); 


//スコアの初期値
let score = 0;

//キーイベント＆入力判定
const KeyDown = (e) => {
    
    wrap.style.backgroundColor = '#666';
    
    //同じキーを押した場合の処理
    if(e.key === checkTexts[0].textContent){
       
       //add-colorクラスを付与する
       checkTexts[0].className = 'add-color';
       
       //checkTextsの文字を消す
       checkTexts.shift();
       
       //正しい入力の場合スコアを加点する
       score++;
       
       sound();
       
       // 最後まで入力したら新しいテキストを用意する
       if(checkTexts.length == 0) {
           createText();
       }


    //Shiftキーを押した時は色が変わらない   
    }else if(e.key === 'Shift'){
       wrap.style.backgroundColor = '#666';
    
    //shitfキー以外の場合色を変える
    }else{
       wrap.style.backgroundColor = 'red';
    };
    
};
   

//タイマー処理
const timer = () =>{
    
    //初期値
    let time = 60;
    
    //タイマーの要素を取得
    const count = document.getElementById('count');
    

    //元々の型 setInterval(() => {},100)
    //id = time
    const id = setInterval(() => {
        
        //clearInterval動作時、idを引数にし、0で停止
        if(time <= 0) {
            gameOver(id);
        }
        //1ずつ増やす場合は→time++
        //タイマーの表示を1ずつ減らしていく
        count.textContent = time--;
        
        //カウントが始まると同時にスタートボタンを消す
        start.style.display = 'none';
        
    },1000)
    
};


//ゲーム終了処理
const gameOver = (id) => {
    
    clearInterval(id);
    
    const result = confirm(rankCheck(score));
    
    //OKボタンを押すと画面ロード
    if(result){
        window.location.reload();
    }
};


//ランク判定とメッセージ生成処理
const rankCheck = (score)  => {
    
     let rankText = '';
     
     // スコアに応じて異なるメッセージを変数textに格納する
     if(score < 100){
         rankText = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
     
     }else if(score < 200){
         rankText = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;  
     
     }else if(score < 300){
         rankText = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`; 
     
     }else　if(score >=300){
         rankText = `あなたのランクはSです。\nおめでとうございます！`;    
     }
     
     
     // 生成したメッセージと一緒に文字列を返す
     return `${score}文字打てました！\n${rankText}\n【OK】リトライ／【キャンセル】終了`;
};


//音楽再生
const sound = () => {
    var music = new Audio('sound/keydown.mp3');
    music.play();
}

