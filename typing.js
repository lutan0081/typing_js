// 必要なHTML要素の取得
const wrap = document.getElementById('wrap');

const start = document.getElementById('start');

//テキストの配列作成
const textLists = [
        
    //[0]漢字[1]ローマ字
    ['人間の平等','ningennobyoudou'],
    ['ルタン','lutan'],
    ['隣の客はよく柿食う客だ','tonarinokyakuhayokukakikuukyaku'],
    ['馬鹿につける薬はない','bakanitukerukusurihanai'],
    ['ブタに真珠','butanisinju'],
    ['日頃の恨みを晴らす','higoronouramiwoharasu'],
    ['インスタグラムで成金の奴','insutaguramudenarikinnoyatu'],
    ['アイコスレギュラー','aikosuregyura-'],
    ['六代目大関屋','rokudaimeozekiya'],
    ['コロナウィルス','koronaulirusu'],
    ['都道府県','todouhuken'],
    ['クラシック音楽','kurasikkuonngaku'],
    ['布団が恋しい季節','hutongakoisiikisetu'],
    ['傘でゴルフの練習','kasedegorufunorennsyu'],
    ['ご検討をお祈りします','gokentouwooinorisimasu'],
    ['英会話レッスン','eikaiwaressunn'],
    ['なんでやねん','nandeyanenn'],
    ['仕事をする意味が分からない','sigotowosuruimigawakaranai'],
    ['伊藤博文は初代内閣総理大臣','itouhirohumihasyodainaikakusouridaijin'],
    ['高額な商品','kougakunasyouhin'],
    ['適正な価格の取引','tekiseinakakakunotorihiki'],
    ['おにぎりはやっぱりツナマヨ','onigirihayapparitunamayo']
];


//要素取得
const startBtn = document.getElementById('btn-social-long-button');
   
    
//スタートボタンの処理
startBtn.addEventListener('click', () => {
    
    //カウントが始まると同時にスタートボタンを消す
    startBtn.style.display = 'none';
    
    //秒数カウントの処理
    timer();
});

    
//ローマ字を格納する定数
let checkTexts = [];


//日本語を格納する定数
let checkTextsJapanese = [];


//テキスト表示
const createText = () => {
    
    
    //日本語要素取得
    const txtJapanese = document.getElementById('text_japanese');
    
    //ローマ字要素取得
    const txtRoma = document.getElementById('text_roma');
    
    // 配列のインデックス数からランダムな数値を生成する
    const rnd = Math.floor(Math.random() * textLists.length);
    
    //初期化
    txtJapanese.textContent = '';
    
    txtRoma.textContent = '';
    
    
    //日本語のテキスト
    checkTextsJapanese = textLists[rnd][0].split('').map(value =>{
        
        //span要素を新しく生成
        const span = document.createElement('span')
        
        //span要素(html)に配列の1文字ずつを当てはめる
        span.textContent = value;
        
        //上部でtxtRomaの値取得後、再度値を入れる
        txtJapanese.appendChild(span);
        
        //returnでcheckTextsに入れる
        return span;
    });
    
    
    //ローマ字のテキスト
    //map()新しい配列を生成し、checkTextsに値を入れる
    checkTexts = textLists[rnd][1].split('').map(value =>{
        
        
        //ローマ字の設定
        //span要素を新しく生成
        const span = document.createElement('span')
        
        //span要素(html)に配列の1文字ずつを当てはめる
        span.textContent = value;
        
        //上部でtxtRomaの値取得後、再度値を入れる
        txtRoma.appendChild(span);
        
        //returnでcheckTextsに入れる
        return span;
    });
    
    
    // キーボードのイベントを発生（KeyDownを作動)
    document.addEventListener('keydown', KeyDown);
    
}; 


//スコアの初期値
let score = 0;


//キーイベント＆入力判定
const KeyDown = (e) => {
    
    
    //同じキーを押した場合の処理
    if(e.key === checkTexts[0].textContent){
      
        console.log('キーが入力されました')
        
        //add-colorクラスを付与する
        checkTexts[0].className = 'add-color';
           
           
        //checkTextsの文字を消す
        checkTexts.shift();
        
        
        //入力時の効果音
        keySound();
        
        
        //正しい入力の場合スコアを加点する
        score++;
           
           
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
    
    //秒数の要素設定
    const gameCount = document.getElementById("count");
    
    
    //カウントダウンの設定
    let countDoowTime = 5;
    
    
    //指定した秒数分、カウントを遅延させる
    window.setTimeout(startSound, 950);
    
    
    //スタートの秒数カウント
    const startCount = setInterval(() => {
        
        //秒数を減らす
        count.textContent = countDoowTime--;
        
        //カウントダウンタイマーが0になった時
        if(countDoowTime <= -1){
            
            //カウントを止める
            clearInterval(startCount);
            
            //ゲームカウントの再設定
            setGameCount(gameCount);
            
            //テキスト作成の関数
            createText();
        }
    },1000);
    
};


//ゲームカウント設定(引数カウントダウンの要素)
const setGameCount = (gameCount) =>{
    
    //ゲームのプレイ時間
    let time = 60;
    
    //制限時間の表示
    count.textContent = time;
    
    
    const id = setInterval(() => {
    
        //clearInterval動作時、idを引数にし、0で停止
        if(time <= 0) {
            
            //ゲームオーバーの設定
            gameOver(id);
            
        }
        
        //1ずつ増やす場合は→time++
        //タイマーの表示を1ずつ減らしていく
        gameCount.textContent = time--;
    
    
    },1000)
    
    
}


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


//タイピング時効果音
const keySound = () => {
    var music = new Audio('sounds/key_sound');
    //music.loop = true;
    music.play();
}


//スタート時のカウントダウン音
const startSound = () => {
    var music = new Audio('sounds/count_down');
    music.play();
}
