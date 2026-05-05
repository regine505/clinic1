<template>
  <div>
    <h2><i class="fa-solid fa-gamepad"></i> Digital Health Guide - NPC Adventure</h2>
    
    <div class="game-card">
      <div class="text-center mb-3">
        <i class="fa-solid fa-robot fa-3x"></i>
        <h4 class="mt-2">Clinic Guide: Dr. Healbot</h4>
      </div>
      
      <div class="row text-center mb-4">
        <div class="col-6">
          <div class="bg-light text-dark rounded p-2">
            <strong>Health Score</strong>
            <h3>{{ healthScore }}</h3>
          </div>
        </div>
        <div class="col-6">
          <div class="bg-light text-dark rounded p-2">
            <strong>NPCs Helped</strong>
            <h3>{{ npcHelped }}</h3>
          </div>
        </div>
      </div>

      <div class="mb-3">
        <p><i class="fa-solid fa-comment-dots"></i> {{ currentMessage }}</p>
      </div>

      <div class="d-flex gap-2 flex-wrap justify-content-center">
        <button class="btn btn-success" @click="performAction('checkup')" :disabled="gameOver">
          <i class="fa-solid fa-stethoscope"></i> Perform Checkup
        </button>
        <button class="btn btn-warning" @click="performAction('medicine')" :disabled="gameOver">
          <i class="fa-solid fa-capsules"></i> Give Medicine
        </button>
        <button class="btn btn-info" @click="performAction('advice')" :disabled="gameOver">
          <i class="fa-solid fa-comment-medical"></i> Give Health Advice
        </button>
        <button class="btn btn-secondary" @click="resetGame">
          <i class="fa-solid fa-arrows-rotate"></i> Reset Game
        </button>
      </div>

      <div v-if="gameOver" class="alert alert-warning mt-3 text-center">
        <strong>Game Over!</strong> {{ gameResultMessage }}
        <button class="btn btn-sm btn-primary ms-2" @click="resetGame">Play Again</button>
      </div>

      <div class="mt-4">
        <small><i class="fa-solid fa-people-arrows"></i> Waiting NPCs in Clinic: {{ waitingNpcs.length }}</small>
        <div class="mt-2">
          <span v-for="npc in waitingNpcs" :key="npc.id" class="badge bg-light text-dark me-2 mb-2 p-2">
            {{ npc.name }} ({{ npc.condition }})
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      healthScore: 50,
      npcHelped: 0,
      currentMessage: 'Welcome! Help NPC patients by choosing actions wisely!',
      gameOver: false,
      gameResultMessage: '',
      waitingNpcs: [
        { id: 1, name: 'Old Muraho', condition: 'fever', severity: 70 },
        { id: 2, name: 'Young Ingabire', condition: 'cough', severity: 40 },
        { id: 3, name: 'Mama Claudine', condition: 'headache', severity: 60 },
        { id: 4, name: 'Papa Habimana', condition: 'fatigue', severity: 50 }
      ],
      currentNpcIndex: 0
    }
  },
  methods: {
    performAction(action) {
      if (this.gameOver) return
      
      if (this.currentNpcIndex >= this.waitingNpcs.length) {
        this.gameWin()
        return
      }
      
      const currentNpc = this.waitingNpcs[this.currentNpcIndex]
      let success = false
      let message = ''
      
      if (action === 'checkup') {
        if (currentNpc.severity > 50) {
          success = true
          message = `✅ Checkup successful! ${currentNpc.name} feels better. +10 Health Score!`
          this.healthScore += 10
        } else {
          message = `⚠️ Checkup was rushed! ${currentNpc.name} still needs help. -5 Health Score`
          this.healthScore -= 5
        }
      } else if (action === 'medicine') {
        if (currentNpc.condition === 'fever' || currentNpc.condition === 'cough') {
          success = true
          message = `💊 Medicine worked perfectly! ${currentNpc.name} cured. +15 Health Score!`
          this.healthScore += 15
        } else {
          message = `😷 Wrong medicine! ${currentNpc.name} condition worsens. -10 Health Score`
          this.healthScore -= 10
        }
      } else if (action === 'advice') {
        if (currentNpc.severity <= 50) {
          success = true
          message = `📋 Great advice! ${currentNpc.name} follows instructions. +8 Health Score!`
          this.healthScore += 8
        } else {
          message = `🤔 Advice ignored! ${currentNpc.name} needs immediate treatment. -7 Health Score`
          this.healthScore -= 7
        }
      }
      
      if (success) {
        this.npcHelped++
        this.currentNpcIndex++
        message += ` (+1 NPC helped)`
      }
      
      this.currentMessage = message
      
      if (this.healthScore <= 0) {
        this.gameOver = true
        this.gameResultMessage = 'Clinic reputation damaged! You failed to help patients.'
        this.currentMessage = 'GAME OVER - Health Score reached zero!'
      } else if (this.currentNpcIndex >= this.waitingNpcs.length && this.npcHelped > 0) {
        this.gameWin()
      }
    },
    
    gameWin() {
      this.gameOver = true
      this.gameResultMessage = `🎉 VICTORY! You helped ${this.npcHelped} NPCs! Your clinic is thriving! 🎉`
      this.currentMessage = this.gameResultMessage
      if (this.healthScore > 100) this.healthScore = 100
    },
    
    resetGame() {
      this.healthScore = 50
      this.npcHelped = 0
      this.gameOver = false
      this.currentNpcIndex = 0
      this.gameResultMessage = ''
      this.currentMessage = 'Game reset! Help NPC patients by choosing actions wisely!'
      this.waitingNpcs = [
        { id: 1, name: 'Old Muraho', condition: 'fever', severity: 70 },
        { id: 2, name: 'Young Ingabire', condition: 'cough', severity: 40 },
        { id: 3, name: 'Mama Claudine', condition: 'headache', severity: 60 },
        { id: 4, name: 'Papa Habimana', condition: 'fatigue', severity: 50 }
      ]
    }
  }
}
</script>