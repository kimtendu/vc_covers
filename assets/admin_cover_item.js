! function($)  {
    "use strict";
    //console && console.log('ViewCoverItem is loaded');
// Come from vc_map -> 'js_view' => 'ViewCoverItem'
    var Shortcodes = vc.shortcodes;
    window.ViewCoverItem = vc.shortcode_view.extend({
        // Render method called after element is added( cloned ), and on first initialisation
        render: function () {
            console && console.log('ViewCoverItem: render method called.');
            window.ViewCoverItem.__super__.render.call(this);
            //make sure to call __super__. To execute logic fron inherited view. That way you can extend original logic. Otherwise, you will fully rewrite what VC will do at this event

            return this;
        },
        ready: function (e) {
            console && console.log('ViewCoverItem: ready method called.');
            window.ViewCoverItem.__super__.ready.call(this, e);

            return this;
        },
        //Called every time when params is changed/appended. Also on first initialisation
        changeShortcodeParams: function (model) {
            console && console.log('ViewCoverItem: changeShortcodeParams .');
            // console && console.log(model.getParam('value') + ': this was maped in vc_map() "param_name"  => "value"');
            // console && console.log('value');
            // console && console.log(model.getParam('value'));
            // console && console.log('content');
            // console && console.log(model.getParam('content'));
            this.setColumnClasses(model);

            window.ViewCoverItem.__super__.changeShortcodeParams.call(this, model);
        },
        changeShortcodeParent: function (model) {
            console && console.log('ViewCoverItem: changeShortcodeParent method called.');
            window.ViewCoverItem.__super__.changeShortcodeParent.call(this, model);
        },
        deleteShortcode: function (e) {
            console && console.log('ViewCoverItem: deleteShortcode method called.');
            window.ViewCoverItem.__super__.deleteShortcode.call(this, e);
        },
        editElement: function (e, model) {
            console && console.log('ViewCoverItem: editElement method called.');
            window.ViewCoverItem.__super__.editElement.call(this, e);
            //this.setColumnClasses(model);
        },
        clone: function (e) {
            console && console.log('ViewCoverItem: clone method called.');
            window.ViewCoverItem.__super__.clone.call(this, e);
        },
        setColumnClasses: function (model) {
            console && console.log('ViewCoverItem: setColumnClasses');
            //console && console.log(allClasses);
            this.$el.removeClass('col-md-3');
            this.$el.removeClass('col-md-4');
            this.$el.removeClass('col-md-6');
            this.$el.removeClass('col-md-8');
            this.$el.removeClass('col-md-9');
            this.$el.removeClass('col-md-12');
            this.$el.removeClass('height-100');
            this.$el.removeClass('height-200');
            this.$el.removeClass('height-300');
            this.$el.addClass(model.getParam('el_class'));
            this.$el.addClass(model.getParam('el_class_height'));

            var mainSelector = '[data-model-id="' + this.model.id + '"]',
                image = document.querySelector(mainSelector + ' .covers_admin_image');
            // image.setAttribute('src', );
            $(mainSelector + ' .covers_admin_title').text(model.getParam('el_title'));
            $(mainSelector + ' .covers_admin_text').text(model.getParam('el_text'))

            $.ajax({
                type: "POST",
                url: window.ajaxurl,
                data: {
                    action: "wpb_single_image_src",
                    content: model.getParam('el_image'),
                    size: "thumbnail",
                    _vcnonce: window.vcAdminNonce
                },
                dataType: "html",
                context: this
            }).done(function (url) {
                image.setAttribute('src',url );
                //console && console.log(url);
            })


        },
    });


    window.ViewCovers = vc.shortcode_view.extend({
        events: {
            "click > .vc_controls .set_columns": "setColumns",
            'click > .vc_controls [data-vc-control="delete"]': "deleteShortcode",
            'click > .vc_controls [data-vc-control="add"]': "addElement",
            'click > .vc_controls [data-vc-control="edit"]': "editElement",
            'click > .vc_controls [data-vc-control="clone"]': "clone",
            "click > .wpb_element_wrapper > .vc_empty-container": "addToEmpty"
        },
        current_column_width: !1,
        initialize: function(options) {
            window.VcColumnView.__super__.initialize.call(this, options), _.bindAll(this, "setDropable", "dropButton")
        },
        ready: function(e) {
            return window.VcColumnView.__super__.ready.call(this, e), this
        },
        render: function() {
            return window.VcColumnView.__super__.render.call(this), this.current_column_width = this.model.get("params").width || "1/1",
                this.$el.attr("data-width", this.current_column_width), this.setEmpty(), this
        },
        setColumns: function(e) {
            _.isObject(e) && e.preventDefault();
            var $button = $(e.currentTarget);
            if ("custom" === $button.data("cells")) this.layoutEditor().render(this.model).show();
            else {
                if (vc.is_mobile) {
                    var $parent = $button.parent();
                    $parent.hasClass("vc_visible") || ($parent.addClass("vc_visible"), $(document).off("click.vcRowColumnsControl").on("click.vcRowColumnsControl", function(e) {
                        $parent.removeClass("vc_visible")
                    }))
                }
                $button.is(".vc_active") || (this.change_columns_layout = !0, _.defer(function(view, cells) {
                    view.convertRowColumns(cells)
                }, this, $button.data("cells")))
            }
            this.$el.removeClass("vc_collapsed-row")
        },
        changeShortcodeParams: function(model) {
            window.VcColumnView.__super__.changeShortcodeParams.call(this, model), this.setColumnClasses(), this.buildDesignHelpers()
        },
        designHelpersSelector: "> .vc_controls .column_add",
        buildDesignHelpers: function() {
            var matches, image, color, css = this.model.getParam("css"),
                $column_toggle = this.$el.find(this.designHelpersSelector).get(0);
            this.$el.find("> .vc_controls .vc_column_color").remove(), this.$el.find("> .vc_controls .vc_column_image").remove(), matches = css.match(/background\-image:\s*url\(([^\)]+)\)/), matches && !_.isUndefined(matches[1]) && (image = matches[1]), matches = css.match(/background\-color:\s*([^\s\;]+)\b/), matches && !_.isUndefined(matches[1]) && (color = matches[1]), matches = css.match(/background:\s*([^\s]+)\b\s*url\(([^\)]+)\)/), matches && !_.isUndefined(matches[1]) && (color = matches[1], image = matches[2]), image && $('<span class="vc_column_image" style="background-image: url(' + image + ');" title="' + i18nLocale.column_background_image + '"></span>').insertBefore($column_toggle), color && $('<span class="vc_column_color" style="background-color: ' + color + '" title="' + i18nLocale.column_background_color + '"></span>').insertBefore($column_toggle)
        },
        setColumnClasses: function() {
            var current_css_class_width,
                offset = this.model.getParam("offset") || "",
                width = this.model.getParam("width") || "1/1",
                css_class_width = this.convertSize(width);
            this.current_offset_class && this.$el.removeClass(this.current_offset_class),
            this.current_column_width !== width &&
            (current_css_class_width = this.convertSize(this.current_column_width), this.$el.attr("data-width", width).removeClass(current_css_class_width).addClass(css_class_width),
                this.current_column_width = width),
            offset.match(/vc_col\-sm\-\d+/) && this.$el.removeClass(css_class_width), _.isEmpty(offset) || this.$el.addClass(offset), this.current_offset_class = offset
        },
        addToEmpty: function(e) {
            e.preventDefault(), $(e.target).hasClass("vc_empty-container") && this.addElement(e)
        },
        setDropable: function() {
            return this.$content.droppable({
                greedy: !0,
                accept: "vc_column_inner" === this.model.get("shortcode") ? ".dropable_el" : ".dropable_el,.dropable_row",
                hoverClass: "wpb_ui-state-active",
                drop: this.dropButton
            }), this
        },
        dropButton: function(event, ui) {
            ui.draggable.is("#wpb-add-new-element") ? vc.add_element_block_view({
                    model: {
                        position_to_add: "end"
                    }
                }).show(this) : ui.draggable.is("#wpb-add-new-row") && this.createRow()
        },
        setEmpty: function() {
            this.$el.addClass("vc_empty-column"), "edit" !== vc_user_access().getState("shortcodes") && this.$content.addClass("vc_empty-container")
        },
        unsetEmpty: function() {
            this.$el.removeClass("vc_empty-column"), this.$content.removeClass("vc_empty-container")
        },
        checkIsEmpty: function() {
            Shortcodes.where({
                parent_id: this.model.id
            }).length ? this.unsetEmpty() : this.setEmpty(), window.VcColumnView.__super__.checkIsEmpty.call(this)
        },
        createRow: function() {
            var row_params, column_params, row;
            return row_params = {}, "undefined" != typeof window.vc_settings_presets.vc_row_inner && (row_params = _.extend(row_params, window.vc_settings_presets.vc_row_inner)), column_params = {
                width: "1/1"
            }, "undefined" != typeof window.vc_settings_presets.vc_column_inner && (column_params = _.extend(column_params, window.vc_settings_presets.vc_column_inner)), row = Shortcodes.create({
                shortcode: "vc_row_inner",
                params: row_params,
                parent_id: this.model.id
            }), Shortcodes.create({
                shortcode: "vc_column_inner",
                params: column_params,
                parent_id: row.id
            }), row
        },
        convertSize: function(width) {
            var prefix = "vc_col-sm-",
                numbers = width ? width.split("/") : [1, 1],
                range = _.range(1, 13),
                num = !_.isUndefined(numbers[0]) && 0 <= _.indexOf(range, parseInt(numbers[0], 10)) && parseInt(numbers[0], 10),
                dev = !_.isUndefined(numbers[1]) && 0 <= _.indexOf(range, parseInt(numbers[1], 10)) && parseInt(numbers[1], 10);
            return !1 !== num && !1 !== dev ? prefix + 12 * num / dev : prefix + "12"
        },
        deleteShortcode: function(e) {
            var parent, parent_id = this.model.get("parent_id");
            _.isObject(e) && e.preventDefault();
            var answer = confirm(window.i18nLocale.press_ok_to_delete_section);
            return !0 === answer && (this.model.destroy(), void(parent_id && !vc.shortcodes.where({
                    parent_id: parent_id
                }).length ? (parent = vc.shortcodes.get(parent_id), _.contains(["vc_column", "vc_column_inner"], parent.get("shortcode")) || parent.destroy()) : parent_id && (parent = vc.shortcodes.get(parent_id), parent && parent.view && parent.view.setActiveLayoutButton && parent.view.setActiveLayoutButton())))
        },
        remove: function() {
            this.$content && this.$content.data("uiSortable") && this.$content.sortable("destroy"), this.$content && this.$content.data("uiDroppable") && this.$content.droppable("destroy"), delete vc.app.views[this.model.id], window.VcColumnView.__super__.remove.call(this)
        }
    });


}(window.jQuery);