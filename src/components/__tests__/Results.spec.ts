import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import Results from '../Results/Results.vue'
import { useRaceStore } from '@/stores/race'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.spyOn(Math, 'random').mockReturnValue(0.5)
})

afterEach(() => {
  vi.restoreAllMocks()
})

function completeRound(store: ReturnType<typeof useRaceStore>, index: number) {
  const round = store.schedule[index]!
  store.schedule[index] = {
    ...round,
    results: round.horses.map((horse, i) => ({ position: i + 1, horse, animationDuration: 5000 + i * 200 })),
  }
}

describe('Results', () => {
  it('shows empty state when no rounds are completed', () => {
    const wrapper = mount(Results)
    expect(wrapper.find('.results__empty').exists()).toBe(true)
    expect(wrapper.findAll('.results__round')).toHaveLength(0)
  })

  it('renders a result block for each completed round', () => {
    const store = useRaceStore()
    store.generateSchedule()
    completeRound(store, 0)
    completeRound(store, 1)

    const wrapper = mount(Results)
    expect(wrapper.findAll('.results__round')).toHaveLength(2)
  })

  it('shows 10 result rows per completed round', () => {
    const store = useRaceStore()
    store.generateSchedule()
    completeRound(store, 0)

    const wrapper = mount(Results)
    expect(wrapper.find('.results__round').findAll('tbody tr')).toHaveLength(10)
  })

  it('displays positions in order', () => {
    const store = useRaceStore()
    store.generateSchedule()
    completeRound(store, 0)

    const wrapper = mount(Results)
    const positions = wrapper.findAll('.pos-cell').map((td) => td.text())
    expect(positions).toEqual(['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'])
  })

  it('matches snapshot with no results', () => {
    const wrapper = mount(Results)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with one completed round', () => {
    const store = useRaceStore()
    store.generateSchedule()
    completeRound(store, 0)
    const wrapper = mount(Results)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
