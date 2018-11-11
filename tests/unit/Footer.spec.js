import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils'
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {

  it('mounts and creates the footer element', () => {
    const wrapper = shallowMount(Footer);
    expect(wrapper.find('footer').exists()).to.be.true;
  });

});
