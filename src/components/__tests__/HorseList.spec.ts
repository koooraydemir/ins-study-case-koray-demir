import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import HorseList from '../HorseList/HorseList.vue'
import { useHorsesStore } from '@/stores/horses'
import { TOTAL_HORSES } from '@/constants/game'

beforeEach(() => {
  setActivePinia(createPinia())
  vi.spyOn(Math, 'random').mockReturnValue(0.5)
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('HorseList', () => {
  it('shows empty state before horses are generated', () => {
    const wrapper = mount(HorseList)
    expect(wrapper.find('.horse-list__empty').exists()).toBe(true)
  })

  it('hides empty state after horses are generated', () => {
    useHorsesStore().generateHorses()
    const wrapper = mount(HorseList)
    expect(wrapper.find('.horse-list__empty').exists()).toBe(false)
  })

  it('renders one row per horse', () => {
    useHorsesStore().generateHorses()
    const wrapper = mount(HorseList)
    expect(wrapper.findAll('tbody tr')).toHaveLength(TOTAL_HORSES)
  })

  it('shows name, condition and color chip for each horse', () => {
    useHorsesStore().generateHorses()
    const wrapper = mount(HorseList)
    const firstRow = wrapper.find('tbody tr')
    expect(firstRow.find('td:nth-child(1)').text()).toBeTruthy()
    expect(firstRow.find('td:nth-child(2)').text()).toMatch(/^\d+$/)
    expect(firstRow.find('.color-chip').exists()).toBe(true)
  })

  it('matches snapshot with no horses', () => {
    const wrapper = mount(HorseList)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot with horses generated', () => {
    useHorsesStore().generateHorses()
    const wrapper = mount(HorseList)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
