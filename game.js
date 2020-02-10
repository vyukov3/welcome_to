var game = {
    options:{
        sequence:[],
        sequenceLenght: 81,
        index:0,
        isAnimationEnd: true,
        isHard:false
    },
    init: function(){
        $('[data-toggle="popover"]').popover();
        $('#startModal').modal();
        game.initCallbacks();
    },
    initCallbacks: function(){
        $(".questWrap img").on('click', function(){ //flip Quest card callback
            if(!$(this).hasClass('animated')){
                var $this = $(this);
                $this.addClass('flipInY').addClass('animated');
                var linkArr = $this.attr('src').split('.');
                $this.attr('src', linkArr[0] + '_b.' + linkArr[1]);
            }
        });
        $(".stepNext").on('click', function(){
            game.changeCards();
        })
        $(".stepPrev").on('click', function(){
            if(game.options.index > 3){
                game.options.index -= 6;
                game.changeCards();
            }
        })
        $(document).on('keydown', function(e){
            e.preventDefault();
            if((e.code == 'Space' || e.code == 'ArrowRight') && game.options.isAnimationEnd){
                game.changeCards();
            }
        });
        $('.start').on('click', function(){
            $('#startModal').modal('hide');
        });
        $('#startModal').on('hide.bs.modal', function(){
            game.createSequence();
            game.changeCards();
            game.getRandomQuests();
        });
    },
    createSequence: function(){
        for(var i = 0; i < game.options.sequenceLenght; i++) game.options.sequence.push(i);
        var currentIndex = game.options.sequenceLenght, temporaryValue, randomIndex;
        while(currentIndex != 0){
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = game.options.sequence[currentIndex];
            game.options.sequence[currentIndex] = game.options.sequence[randomIndex];
            game.options.sequence[randomIndex] = temporaryValue;
        }
    },
    getRandomQuests: function(){
        var t1 = 0, t2 = 0, t3 = 0;
        if(game.options.isHard){
            t1 = Math.floor(Math.random() * 4);
            t2 = Math.floor(Math.random() * 4);
            $(".questWrap img[data-index='0']").attr("src", "sources/Quests/hard/t1_"+t1+".png");
            $(".questWrap img[data-index='1']").attr("src", "sources/Quests/hard/t2_"+t2+".png");
        }else{
            t1 = Math.floor(Math.random() * 5);
            t2 = Math.floor(Math.random() * 5);
            $(".questWrap img[data-index='0']").attr("src", "sources/Quests/easy/t1_"+t1+".png");
            $(".questWrap img[data-index='1']").attr("src", "sources/Quests/easy/t2_"+t2+".png");
        }
        t3 = Math.floor(Math.random() * 5);
        $(".questWrap img[data-index='2']").attr("src", "sources/Quests/easy/t3_"+t3+".png");
    },
    changeCards: function(){
        game.options.isAnimationEnd = false;
        if(game.options.sequenceLenght == game.options.index){
            game.createSequence();
            game.options.index = 0;
        }
        for(var i = 0; i < 3; i++){
            $(".numberCard[data-index="+i+"]").removeClass("animated flipOutX").addClass("animated flipOutX").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass("animated flipOutX")
                var src = $(this).attr("src").split('.')[0];
                var name = src.split('/');
                name[2] = 'c'+game.options.sequence[game.options.index++];
                $(this).attr("src", name.join('/')+'.png');
            });
            var src = $(".numberCard[data-index="+i+"]").attr("src").split('.')[0].split('/');
            var prevIndex = +src[2].substring(1, src[2].lenght);
            var newBack = game.getBackByIndex(prevIndex);
            
            $(".backCard[data-index="+i+"]").attr("src", 'sources/Backs/'+newBack+'.png').removeClass("animated slideInUp").addClass("animated slideInUp").one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
                $(this).removeClass("animated slideInUp");
                if(i == 3)game.options.isAnimationEnd = true;
            });
        }
        console.log(game.options.index);    
    },
    getBackByIndex: function(index){
        var res = "";
        if(index < 18) res = "fence";
        else if (index < 36) res = "agent";
        else if (index < 54) res = "green";
        else if (index < 63) res = "pool";
        else if (index < 72) res = "worker";
        else res = "bis";
        return res;
    }
}
