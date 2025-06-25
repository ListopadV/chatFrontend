import '@mui/material/Button';
import '@mui/material/TextField';
import '@mui/material/Typography';

declare module '@mui/material/Button' {
    interface ButtonPropsVariantOverrides {
        authentication: true;
        authFormPrimary: true;
        authFormSecondary: true;
        confirmChat: true;
        cancelChat: true;
        startChatLanding: true;
    }
}

declare module '@mui/material/TextField' {
    interface TextFieldVariantOverrides {
        authentication: true;
    }
}

declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        modalTitle: true;
        modalBotName: true;
        modalBotModel: true;
        modalPlaceholder: true;
        chatParam: true;
        miniChatBotName: true;
        miniChatName: true;
        miniChatDate: true;
        carouselTitle: true;
        carouselText: true;
        storyGradient: true;
        sectionGradient: true;
        visionSubtitle: true;
        visionHighlight: true;
        welcomeTitle: true;
        welcomeDesc: true;
    }
}
