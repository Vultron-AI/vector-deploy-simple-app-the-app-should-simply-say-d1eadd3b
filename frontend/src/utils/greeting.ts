/**
 * Greeting Utility
 *
 * Returns an appropriate greeting based on the current time of day.
 * - Morning (5am-12pm): "Good morning"
 * - Afternoon (12pm-6pm): "Good afternoon"
 * - Evening (6pm-5am): "Good evening"
 */

export function getGreeting(): string {
  const hour = new Date().getHours()

  if (hour >= 5 && hour < 12) {
    return 'Good morning'
  } else if (hour >= 12 && hour < 18) {
    return 'Good afternoon'
  } else {
    return 'Good evening'
  }
}
