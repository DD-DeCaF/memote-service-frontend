import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils'
import Header from '@/components/Header.vue';

describe('Header.vue', () => {

  it('mounts and creates the nav element', () => {
    const wrapper = shallowMount(Header);
    expect(wrapper.find('nav').exists()).to.be.true;
  });

});
