import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import Program from '../Program/Program.vue'
import { useRaceStore } from '@/stores/race'
import { TOTAL_ROUNDS } from '@/constants/game'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.spyOn(Math, 'random').mockReturnValue(0.5)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('Program', () => {
  it('shows empty state before schedule is generated', () => {
    const wrapper = mount(Program)
    expect(wrapper.find('.program__empty').exists()).toBe(true)
    expect(wrapper.findAll('.program__round')).toHaveLength(0)
  })

  it('renders all rounds after schedule is generated', () => {
    useRaceStore().generateSchedule()
    const wrapper = mount(Program)
    expect(wrapper.findAll('.program__round')).toHaveLength(TOTAL_ROUNDS)
  })

  it('each round shows 10 horse rows', () => {
    useRaceStore().generateSchedule()
    const wrapper = mount(Program)
    const firstRound = wrapper.find('.program__round')
    expect(firstRound.findAll('tbody tr')).toHaveLength(10)
  })

  it('active round has the active modifier class', () => {
    const store = useRaceStore()
    store.generateSchedule()
    store.schedule[0] = { ...store.schedule[0]!, roundNumber: 1, results: null }
    Object.defineProperty(store, 'currentRound', { get: () => store.schedule[0] })

    const wrapper = mount(Program)
    expect(wrapper.find('.program__round').classes()).toContain('program__round--active')
  })

  it('completed round has the done modifier class', () => {
    const store = useRaceStore()
    store.generateSchedule()
    const round = store.schedule[0]!
    store.schedule[0] = {
      ...round,
      results: round.horses.map((horse, i) => ({ position: i + 1, horse, animationDuration: 5000 })),
    }

    const wrapper = mount(Program)
    expect(wrapper.find('.program__round').classes()).toContain('program__round--done')
  })

  it('matches snapshot with empty schedule', () => {
    const wrapper = mount(Program)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with full schedule', () => {
    useRaceStore().generateSchedule()
    const wrapper = mount(Program)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
