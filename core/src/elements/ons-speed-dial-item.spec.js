'use strict';

describe('OnsSpeedDialItemElement', () => {
  let item;

  beforeEach(() => {
    item = new ons.elements.SpeedDialItem();
    document.body.appendChild(item);
  });

  afterEach(() => {
    item.remove();
    item = null;
  });

  it('exists', () => {
    expect(window.ons.elements.SpeedDialItem).to.be.ok;
  });

  it('provides modifier attribute', () => {
    ons.modifier.add(item, 'hoge');
    expect(item.classList.contains('speed-dial__item--hoge')).to.be.true;
    ons.modifier.remove(item, 'hoge');

    ons.modifier.add(item, 'foo', 'bar');
    expect(item.classList.contains('speed-dial__item--foo')).to.be.true;
    expect(item.classList.contains('speed-dial__item--bar')).to.be.true;
    expect(item.classList.contains('speed-dial__item--hoge')).not.to.be.true;
    ons.modifier.remove(item, 'foo', 'bar');

    item.classList.add('speed-dial__item--piyo');
    ons.modifier.add(item, 'fuga');
    expect(item.classList.contains('speed-dial__item--piyo')).to.be.true;
    expect(item.classList.contains('speed-dial__item--fuga')).to.be.true;
  });

  describe('"class" attribute', () => {
    it('should contain default class names automatically', () => {
      const element = new ons.elements.SpeedDialItem();
      expect(element.classList.contains('speed-dial__item')).to.be.true;
      expect(element.classList.contains('fab')).to.be.true;
      expect(element.classList.contains('fab--mini')).to.be.true;
      element.setAttribute('class', 'foo');
      expect(element.classList.contains('speed-dial__item')).to.be.true;
      expect(element.classList.contains('fab')).to.be.true;
      expect(element.classList.contains('fab--mini')).to.be.true;
      expect(element.classList.contains('foo')).to.be.true;
    });
  });

  describe('#_onClick()', () => {
    it('should stop propagation', () => {
      const e = {
        stopPropagation: chai.spy()
      };

      item._onClick(e);
      expect(e.stopPropagation).to.have.been.called.once;
    });
  });

  describe('#_compile()', () => {
    it('does not compile twice', () => {
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      div1.innerHTML = '<ons-speed-dial-item>Content</ons-speed-dial-item>';
      div2.innerHTML = div1.innerHTML;
      expect(div1.isEqualNode(div2)).to.be.true;
    });
  });

  describe('autoStyling', () => {
    it('adds \'material\' effects on Android', () => {
      ons.platform.select('android');
      const e = document.createElement('ons-speed-dial-item');
      expect(e.hasAttribute('ripple')).to.be.true;
      expect(e.firstChild.tagName.toLowerCase()).to.equal('ons-ripple');
      ons.platform.select('');
    });
  });
});
