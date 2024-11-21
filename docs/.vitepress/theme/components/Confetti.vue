<script setup lang="ts">
import confetti from 'canvas-confetti'

/* 纸屑 */
confetti({
  particleCount: 200,
  spread: 220,
  origin: { y: 0.3 },
})
</script>
