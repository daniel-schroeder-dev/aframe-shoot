AFRAME.registerComponent('shoot', {
	schema: {
		rate: {
			type: 'number',
			default: 0.05,
		},
		bullet: {
			type: 'selector',
		}
	},
  init: function() {
  	const self = this;
  	const bullet = this.data.bullet;
  	const scene = document.querySelector('a-scene');
  	this.el.addEventListener('click', e => {
  		const targetPosition = e.detail.intersection.point;
  		const cameraPosition = self.el.getAttribute('position');
  		const distance = Math.abs(targetPosition.z - cameraPosition.z);
  		const rate = self.data.rate;
  		const time = distance / rate;
  		const animationString = `
  			property: position;
  			from: ${cameraPosition.x} ${cameraPosition.y} ${cameraPosition.z};
  			to: ${targetPosition.x} ${targetPosition.y} ${targetPosition.z};
  			dur: ${time};
  			easing: linear;
  		`;
  		const clone = bullet.cloneNode();
  		clone.setAttribute('animation', animationString);
  		clone.addEventListener('animationcomplete', () => clone.remove());
  		scene.append(clone);
  	});
  },
});
