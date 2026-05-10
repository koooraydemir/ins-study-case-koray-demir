import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HorseLane from '../RaceTrack/HorseLane.vue'
import type { Horse } from '@/types'

const horse: Horse = { id: 1, name: 'Küheylan', color: '#c0392b', condition: 80 }

const baseProps = { horse, laneNumber: 1, animationDuration: 5000, active: false }

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgb(${r}, ${g}, ${b})`
}

describe('HorseLane', () => {
  it('does not have racing class when inactive', () => {
    const wrapper = mount(HorseLane, { props: baseProps })
    expect(wrapper.find('.lane__horse').classes()).not.toContain('lane__horse--racing')
  })

  it('has racing class when active', () => {
    const wrapper = mount(HorseLane, { props: { ...baseProps, active: true } })
    expect(wrapper.find('.lane__horse').classes()).toContain('lane__horse--racing')
  })

  it('sets animation duration on the horse element', () => {
    const wrapper = mount(HorseLane, { props: { ...baseProps, animationDuration: 6800 } })
    expect(wrapper.find('.lane__horse').attributes('style')).toContain('6800ms')
  })

  it('applies horse color to the color dot', () => {
    const wrapper = mount(HorseLane, { props: baseProps })
    expect(wrapper.find('.lane__color-dot').attributes('style')).toContain(hexToRgb(horse.color))
  })

  it('displays the correct lane number', () => {
    const wrapper = mount(HorseLane, { props: { ...baseProps, laneNumber: 7 } })
    expect(wrapper.find('.lane__number').text()).toBe('7')
  })

  it('matches snapshot at rest', () => {
    const wrapper = mount(HorseLane, { props: baseProps })
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('matches snapshot while racing', () => {
    const wrapper = mount(HorseLane, { props: { ...baseProps, active: true } })
    expect(wrapper.html()).toMatchSnapshot()
  })
})
