import React from 'react';
import Document, { DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export class EverypageDocument extends Document {
  static async getInitialProps(context: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = context.renderPage;

    try {
      context.renderPage = () => originalRenderPage({
        enhanceApp: (App: React.ComponentType) => ((props: any) => sheet.collectStyles(<App {...props} />))
      });
      const initialProps = await Document.getInitialProps(context);
      return {
        ...initialProps,
        styles: (
          <React.Fragment>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </React.Fragment>
        ),
      };
    } finally {
      sheet.seal()
    }
  }
}

export default EverypageDocument;
