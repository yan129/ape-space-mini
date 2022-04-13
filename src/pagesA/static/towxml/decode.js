const config = require('./config');

Component({
	options: {
		styleIsolation: 'apply-shared'
	},
	properties: {
		nodes: {
			type: Object,
			value: {}
		}
	},
	lifetimes: {
		attached: function () {
			const _ts = this;

			config.events.forEach(item => {
				_ts['_' + item] = function (...arg) {
					if (global._events && typeof global._events[item] === 'function') {
						global._events[item](...arg);
					}
				};
			});
		}
	},
	methods: {
		// 只有最顶层可触发
		copyHref: function(e) {
			wx.setClipboardData({
				data: e.currentTarget.dataset.data.attrs.href,
				success: function (res) {
				  wx.getClipboardData({
					success: function (res) {
					  wx.showToast({
						title: '链接复制成功'
					  })
					}
				  })
				}
			})
		},

		// 图片长按保存
		imgLongTap: function(e) {
			let images = [];
            images[0] = e.currentTarget.dataset.data.attrs.src;
			wx.previewImage({
                current: 0,
                urls: images,
                longPressActions: {
                    //长按保存图片到相册
                    itemList: ["保存图片"],
                    success: (data) => {
                        wx.saveImageToPhotosAlbum({
                            //保存图片到相册
                            filePath: path,
                            success: function () {
                                wx.showToast({ icon: "success", title: "保存成功" });
                            },
                            fail: (err) => {
                                wx.showToast({ icon: "none", title: "保存失败，请重新尝试" });
                            },
                        });
                    },
                    fail: (err) => {
                        console.log(err.errMsg);
                    },
                },
            });
		},

		// 复制代码
		copyCode: function(e) {
			if (JSON.stringify(e.currentTarget.dataset) !== '{}') {
				let codeArrayValue = new Array();
				let className = e.currentTarget.dataset.data.attrs.class;
				if (className.includes("h2w__code language") || className.includes("h2w__span hljs-attribute")) {
					let childrens = e.currentTarget.dataset.data.children;
					if (childrens.length > 0) {
						this.parseCodeChildren(childrens, codeArrayValue);
						wx.setClipboardData({
							data: codeArrayValue.join('').replace(/\s/g, " ").replace(/>>>&&>>>/g, "\n"),
							success: function (res) {
							  wx.getClipboardData({
								success: function (res) {
								  wx.showToast({
									title: '代码复制成功'
								  })
								}
							  })
							}
						})
					}
				}
			}
		},
		// 解析代码块数据
		parseCodeChildren(childrens, codeArrayValue){
			for(let key in childrens) {
				let children = childrens[key];
				if (JSON.stringify(children.attrs) !== "{}" && children.attrs.class.includes("h2w__lineNum")) {
					continue;
				}
				if (children.type == "text") {
					codeArrayValue.push(children.text);
				}
				if (JSON.stringify(children.attrs) !== "{}" && children.attrs.class.includes("h2w__br") && children.type === "tag") {
					// 默认 >>>&&>>> 用于处理换行，因为使用 \s 匹配替换所有的空白为半角空格，也会替换掉换行、回车符
					codeArrayValue.push('>>>&&>>>');
				}
				if (children.type === "tag" && children.children.length > 0) {
					// 递归
					this.parseCodeChildren(children.children, codeArrayValue);
				}
	
			}
		}
	}
})