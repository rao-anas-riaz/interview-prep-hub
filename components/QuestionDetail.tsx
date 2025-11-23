
import React from 'react';
import { InterviewQuestion } from '../types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Card from './ui/Card';

interface QuestionDetailProps {
  question: InterviewQuestion;
}

const DetailSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <Card className="bg-slate-950">
        <div className="p-6">
            <h3 className="text-lg font-semibold text-sky-400 mb-4 font-lexend">
                <span>{title}</span>
            </h3>
            <div className="text-slate-300 leading-relaxed prose prose-invert prose-p:text-slate-300 prose-li:text-slate-300">
                {children}
            </div>
        </div>
    </Card>
);

const QuestionDetail: React.FC<QuestionDetailProps> = ({ question }) => {
  const processMarkdown = (text: string): string => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  const renderFormattedText = (text: string) => {
    if (!text) return null;
    
    const parts = text.split(/(---CODE_START---(?:[a-z]+)?|---CODE_END---)/g);

    let isCodeBlock = false;
    let codeLang = '';

    return parts.map((part, index) => {
      if (part.startsWith('---CODE_START---')) {
        isCodeBlock = true;
        codeLang = part.replace('---CODE_START---', '').trim() || 'text';
        return null;
      }
      if (part === '---CODE_END---') {
        isCodeBlock = false;
        codeLang = '';
        return null;
      }
      
      if (part.trim() === '') return null;

      if (isCodeBlock) {
        return (
          <div className="not-prose my-4 text-[14px]" key={index}>
            <SyntaxHighlighter
              language={codeLang}
              style={tomorrow}
              customStyle={{
                borderRadius: '0.5rem',
                border: '1px solid #334155', /* slate-700 */
                margin: 0,
                backgroundColor: '#0f172a' /* slate-900 */
              }}
              codeTagProps={{ style: { fontFamily: "'Roboto Mono', monospace" } }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {part.trim()}
            </SyntaxHighlighter>
          </div>
        );
      }
      
      return part.split('\n').map((paragraph, i) => {
        if (paragraph.trim() === '') return null;
        const processedParagraph = processMarkdown(paragraph);
        return <p key={`${index}-${i}`} dangerouslySetInnerHTML={{ __html: processedParagraph }} />;
      });
    });
  };

  return (
    <div className="p-6 fade-in">
      <h1 className="text-2xl font-extrabold text-white mb-8 font-lexend">{question.question}</h1>

      <div className="space-y-6">
          <DetailSection title="Core Concepts">
              {renderFormattedText(question.concepts)}
          </DetailSection>

          <DetailSection title="Detailed Solution">
              {renderFormattedText(question.answer)}
          </DetailSection>

          <DetailSection title="Example">
              {renderFormattedText(question.example)}
          </DetailSection>

          {question.whatIf && (
            <DetailSection title="What If Scenario">
                {renderFormattedText(question.whatIf)}
            </DetailSection>
          )}
      </div>
    </div>
  );
};

export default QuestionDetail;
