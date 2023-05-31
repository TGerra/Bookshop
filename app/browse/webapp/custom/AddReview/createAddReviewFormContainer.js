sap.ui.define(
    [
        "sap/ui/layout/form/FormContainer",
        "sap/ui/layout/form/FormElement",
        "sap/m/Input",
        "sap/m/RatingIndicator",
        "sap/m/TextArea",
        "../annotations"
      ],
      
      function (FormContainer,FormElement, Input, RatingIndicator,TextArea , annotations) {
        "use strict";

        const isMandatory = (annotation) => annotation === annotations.mandatory;

        const createTitleElement = () => {
            const oTitleElement = new FormElement({ label:"Заголовок"});
            const oTitleInput   = new Input(
                {
                    value: "{title}",
                    required: {
                        path: `title##${annotations.fieldControl}/$EnumMember`,
                        formatter: isMandatory,
                    },
                });
            oTitleElement.addField(oTitleInput);

            return oTitleElement;
        };
        const validateMinMax = (max,min) => {
            if (max && min !== 0) {
                throw new Error(
                    `Expected the rating field to have a minimum value of 0 but instead got ${min}`
                );
            }
            return max || 0;
        };

        const createRatingElement = () => {
            const oRatingElement = new FormElement({ label: "Рейтинг"});
            const oRatingInput   = new RatingIndicator({
                value:      "{rating}",
                maxValue:   {
                    parts: [
                        {   path: `rating##${annotations.maximum}`},
                        {   path: `rating##${annotations.minimum}`},
                    ],
                    formatter: validateMinMax,
                },

            });
            oRatingElement.addField(oRatingInput);

            return oRatingElement; 
        };

        const createCommentElement = () => {
            const oCommentElement = new FormElement({label: "Комментарий"});
            const oCommentInput   = new TextArea({
                value: "{text}",
            });
            oCommentElement.addField(oCommentInput);

            return oCommentElement;
        };

        return () => {
            const oContainerTemplate = new FormContainer();
            const oTitleElement      = createTitleElement();
            const oRatingElement     = createRatingElement();
            const oCommentElement    = createCommentElement();

            oContainerTemplate.addFormElement(oTitleElement);
            oContainerTemplate.addFormElement(oRatingElement);
            oContainerTemplate.addFormElement(oCommentElement);
            return oContainerTemplate;
        };
    }
);