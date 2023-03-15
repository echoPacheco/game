new Vue({
    el: '#app',
    data: {
        gameRunnig: false,
        gameFinished: false,
        victory: null,
        playerLife: 100,
        monsterLife: 100,
        playerMp: 50,
        playerLogs: [],
        monsterLogs: [],
        battleLogs: [],
    },
    computed: {
        playerLifeBar() {
            return {
                width: `${this.playerLife}%`
            }
        },
        playerMpBar() {
            return {
                width: `${this.playerMp}%`
            }
        },
        monsterLifeBar() {
            return {
                width: `${this.monsterLife}%`
            }
        }
    },
    watch: {
        monsterLife() {
            if (this.monsterLife <= 0) {
                this.monsterLife = 0
                this.victory = true
                this.gameFinished = true
            }
        },
        playerLife() {
            if (this.playerLife <= 0) {
                this.playerLife = 0
                this.victory = false
                this.gameFinished = true
            }
        },
    },
    methods: {
        startGame() {
            this.resetStats()
            this.gameRunnig = true
        },
        resetStats() {
            this.gameFinished = false
            this.playerLife = 100
            this.playerMp = 50
            this.monsterLife = 100
            this.battleLogs = []
        },
        monsterAttack() {
            let random = Math.random()
            let damage = Math.floor(random * 11) + 7
            this.playerLife -= damage
            this.battleLogs.push([`O monstro deu ${damage} de dano`, 'monster'])
        },
        playerAction(action) {
            if (this.gameFinished == true) return
            let random = Math.random()
            switch (action) {
                case "normalAttack":
                    let damage = Math.floor(random * 11) + 5
                    this.monsterLife -= damage
                    this.battleLogs.push([`O jogador deu ${damage} de dano`, 'player'])
                    this.refillMana()
                    break;
                case "specialAttack":
                    if (this.playerMp < 60) {
                        this.battleLogs.push([`Sem mana suficente`, 'player'])
                        return
                    }
                    let damageSpecial = Math.floor(random * 11) + 20
                    this.monsterLife -= damageSpecial
                    this.battleLogs.push([`O jogador deu ${damageSpecial} de dano`, 'player'])
                    this.playerMp -= 60
                    break;
                case "heal":
                    if (this.playerMp < 40) {
                        this.battleLogs.push([`Sem mana suficente`, 'player'])
                        return
                    }
                    let heal = Math.floor(random * 11) + 20
                    this.playerLife += heal
                    this.battleLogs.push([`O jogador curou ${heal} de vida`, 'player'])
                    if (this.playerLife >= 100) {
                        this.playerLife = 100
                    }
                    this.playerMp -= 40
                    break;
            }
            this.monsterAttack()
        },
        refillMana() {
            this.playerMp += 20
            if (this.playerMp > 100) {
                this.playerMp = 100
            }
        },
        giveUp() {
            this.victory = null
            this.gameRunnig = false
            this.gameFinished = false
        }

    }

})