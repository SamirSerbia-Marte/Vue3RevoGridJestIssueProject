import ATable from '@/components/ATable.vue';
import { mount, VueWrapper } from '@vue/test-utils';

const undesiredResult = `<div class="container">
  <!---->
</div>`;

describe('Table Test', () => {
  const wrapper: VueWrapper<any> = mount(ATable);
  it('loads during testing', () => {
    expect(wrapper.html()).not.toBe(undesiredResult);
  });
});
