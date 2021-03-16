// Generated from ./grammar/SatisfactoryHeaderParser.g4 by ANTLR 4.7.3-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { SatisfactoryHeaderParserListener } from "./SatisfactoryHeaderParserListener";

export class SatisfactoryHeaderParser extends Parser {
	public static readonly CLASS = 1;
	public static readonly EXTERN = 2;
	public static readonly CONST = 3;
	public static readonly CONSTEXPR = 4;
	public static readonly ENUM = 5;
	public static readonly FALSE = 6;
	public static readonly FORCEINLINE = 7;
	public static readonly FRIEND = 8;
	public static readonly INLINE = 9;
	public static readonly MUTABLE = 10;
	public static readonly NAMESPACE = 11;
	public static readonly OPERATOR = 12;
	public static readonly OVERRIDE = 13;
	public static readonly PRIVATE = 14;
	public static readonly PROTECTED = 15;
	public static readonly PUBLIC = 16;
	public static readonly STATIC = 17;
	public static readonly STRUCT = 18;
	public static readonly TEMPLATE = 19;
	public static readonly TRUE = 20;
	public static readonly TYPEDEF = 21;
	public static readonly TYPENAME = 22;
	public static readonly USING = 23;
	public static readonly VIRTUAL = 24;
	public static readonly UCLASS = 25;
	public static readonly UENUM = 26;
	public static readonly UFUNCTION = 27;
	public static readonly UINTERFACE = 28;
	public static readonly UMETA = 29;
	public static readonly UPARAM = 30;
	public static readonly UPROPERTY = 31;
	public static readonly USTRUCT = 32;
	public static readonly UE_DEPRECATED = 33;
	public static readonly STAT = 34;
	public static readonly SF_CLASS_TAG = 35;
	public static readonly SF_GENERATED_BODY = 36;
	public static readonly AMPERSAND = 37;
	public static readonly BACKSLASH = 38;
	public static readonly BANG = 39;
	public static readonly CLOSE_ANGLE = 40;
	public static readonly CLOSE_BRACE = 41;
	public static readonly CLOSE_PAREN = 42;
	public static readonly CLOSE_SQUARE = 43;
	public static readonly COLON = 44;
	public static readonly COMMA = 45;
	public static readonly EQUALS = 46;
	public static readonly MINUS = 47;
	public static readonly OPEN_ANGLE = 48;
	public static readonly OPEN_BRACE = 49;
	public static readonly OPEN_PAREN = 50;
	public static readonly OPEN_SQUARE = 51;
	public static readonly PERCENT = 52;
	public static readonly PERIOD = 53;
	public static readonly PIPE = 54;
	public static readonly PLUS = 55;
	public static readonly QUESTION = 56;
	public static readonly SEMICOLON = 57;
	public static readonly SLASH = 58;
	public static readonly STAR = 59;
	public static readonly TILDE = 60;
	public static readonly IDENTIFIER = 61;
	public static readonly STRING_LITERAL = 62;
	public static readonly FLOAT_LITERAL = 63;
	public static readonly INTEGER_LITERAL = 64;
	public static readonly HEX_LITERAL = 65;
	public static readonly MultiLineMacro = 66;
	public static readonly Directive = 67;
	public static readonly LINE_COMMENT_START = 68;
	public static readonly BLOCK_COMMENT_START = 69;
	public static readonly WHITESPACE = 70;
	public static readonly LINE_COMMENT_END = 71;
	public static readonly LINE_COMMENT_TEXT = 72;
	public static readonly LINE_COMMENT_OTHER = 73;
	public static readonly BLOCK_COMMENT_END = 74;
	public static readonly BLOCK_COMMENT_NEW_LINE = 75;
	public static readonly BLOCK_COMMENT_TEXT = 76;
	public static readonly BLOCK_COMMENT_OTHER = 77;
	public static readonly RULE_file = 0;
	public static readonly RULE_element = 1;
	public static readonly RULE_value = 2;
	public static readonly RULE_literal = 3;
	public static readonly RULE_identifier = 4;
	public static readonly RULE_stringLiteral = 5;
	public static readonly RULE_numericLiteral = 6;
	public static readonly RULE_booleanLiteral = 7;
	public static readonly RULE_typeDeclaration = 8;
	public static readonly RULE_templateType = 9;
	public static readonly RULE_typeModifier = 10;
	public static readonly RULE_typeReferenceType = 11;
	public static readonly RULE_globalVariableDeclaration = 12;
	public static readonly RULE_classDeclaration = 13;
	public static readonly RULE_classHeader = 14;
	public static readonly RULE_classMacro = 15;
	public static readonly RULE_templateDeclaration = 16;
	public static readonly RULE_classKeyword = 17;
	public static readonly RULE_classInheritance = 18;
	public static readonly RULE_classExtensionList = 19;
	public static readonly RULE_classExtension = 20;
	public static readonly RULE_classBody = 21;
	public static readonly RULE_classEntries = 22;
	public static readonly RULE_classEntry = 23;
	public static readonly RULE_classVisibility = 24;
	public static readonly RULE_classVisibilityModifier = 25;
	public static readonly RULE_friendDeclaration = 26;
	public static readonly RULE_statDeclaration = 27;
	public static readonly RULE_classMethod = 28;
	public static readonly RULE_classMethodEnd = 29;
	public static readonly RULE_classMethodResultModifier = 30;
	public static readonly RULE_classInitializerList = 31;
	public static readonly RULE_classInitializer = 32;
	public static readonly RULE_classProperty = 33;
	public static readonly RULE_classPropertyDefaultValue = 34;
	public static readonly RULE_literalExpression = 35;
	public static readonly RULE_classPropertyArraySize = 36;
	public static readonly RULE_nestedEnum = 37;
	public static readonly RULE_nestedEnumInheritance = 38;
	public static readonly RULE_nestedEnumClass = 39;
	public static readonly RULE_nestedClass = 40;
	public static readonly RULE_nestedStruct = 41;
	public static readonly RULE_genericEnumDeclaration = 42;
	public static readonly RULE_enumDeclaration = 43;
	public static readonly RULE_enumHeader = 44;
	public static readonly RULE_enumBody = 45;
	public static readonly RULE_enumEntry = 46;
	public static readonly RULE_enumValue = 47;
	public static readonly RULE_staticFunctionDeclaration = 48;
	public static readonly RULE_staticArrayDeclaration = 49;
	public static readonly RULE_staticPropertyDeclaration = 50;
	public static readonly RULE_staticInlineFunctionDeclaration = 51;
	public static readonly RULE_staticMethodCall = 52;
	public static readonly RULE_typedef = 53;
	public static readonly RULE_contentWithNestedParens = 54;
	public static readonly RULE_contentWithNestedParensInner = 55;
	public static readonly RULE_contentWithNestedBraces = 56;
	public static readonly RULE_contentWithNestedBracesInner = 57;
	public static readonly RULE_contentWithNestedAngles = 58;
	public static readonly RULE_contentWithNestedAnglesInner = 59;
	public static readonly RULE_contentWithNestedSquares = 60;
	public static readonly RULE_contentWithNestedSquaresInner = 61;
	public static readonly RULE_functionName = 62;
	public static readonly RULE_functionModifier = 63;
	public static readonly RULE_namespaceDeclaration = 64;
	public static readonly RULE_usingNamespace = 65;
	public static readonly RULE_uclassMacro = 66;
	public static readonly RULE_uenumMacro = 67;
	public static readonly RULE_ufunctionMacro = 68;
	public static readonly RULE_uinterfaceMacro = 69;
	public static readonly RULE_umetaMacro = 70;
	public static readonly RULE_uParamMacro = 71;
	public static readonly RULE_upropertyMacro = 72;
	public static readonly RULE_ustructMacro = 73;
	public static readonly RULE_uedeprecatedMacro = 74;
	public static readonly RULE_generatedBodyMacro = 75;
	public static readonly RULE_macroPropertyList = 76;
	public static readonly RULE_macroPropertyListEntries = 77;
	public static readonly RULE_macroProperty = 78;
	public static readonly RULE_macroPropertyPair = 79;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"file", "element", "value", "literal", "identifier", "stringLiteral", 
		"numericLiteral", "booleanLiteral", "typeDeclaration", "templateType", 
		"typeModifier", "typeReferenceType", "globalVariableDeclaration", "classDeclaration", 
		"classHeader", "classMacro", "templateDeclaration", "classKeyword", "classInheritance", 
		"classExtensionList", "classExtension", "classBody", "classEntries", "classEntry", 
		"classVisibility", "classVisibilityModifier", "friendDeclaration", "statDeclaration", 
		"classMethod", "classMethodEnd", "classMethodResultModifier", "classInitializerList", 
		"classInitializer", "classProperty", "classPropertyDefaultValue", "literalExpression", 
		"classPropertyArraySize", "nestedEnum", "nestedEnumInheritance", "nestedEnumClass", 
		"nestedClass", "nestedStruct", "genericEnumDeclaration", "enumDeclaration", 
		"enumHeader", "enumBody", "enumEntry", "enumValue", "staticFunctionDeclaration", 
		"staticArrayDeclaration", "staticPropertyDeclaration", "staticInlineFunctionDeclaration", 
		"staticMethodCall", "typedef", "contentWithNestedParens", "contentWithNestedParensInner", 
		"contentWithNestedBraces", "contentWithNestedBracesInner", "contentWithNestedAngles", 
		"contentWithNestedAnglesInner", "contentWithNestedSquares", "contentWithNestedSquaresInner", 
		"functionName", "functionModifier", "namespaceDeclaration", "usingNamespace", 
		"uclassMacro", "uenumMacro", "ufunctionMacro", "uinterfaceMacro", "umetaMacro", 
		"uParamMacro", "upropertyMacro", "ustructMacro", "uedeprecatedMacro", 
		"generatedBodyMacro", "macroPropertyList", "macroPropertyListEntries", 
		"macroProperty", "macroPropertyPair",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'class'", "'extern'", "'const'", "'constexpr'", "'enum'", 
		"'false'", "'FORCEINLINE'", "'friend'", "'inline'", "'mutable'", "'namespace'", 
		"'operator'", "'override'", "'private'", "'protected'", "'public'", "'static'", 
		"'struct'", "'template'", "'true'", "'typedef'", "'typename'", "'using'", 
		"'virtual'", "'UCLASS'", "'UENUM'", "'UFUNCTION'", "'UINTERFACE'", "'UMETA'", 
		"'UPARAM'", "'UPROPERTY'", "'USTRUCT'", "'UE_DEPRECATED'", "'STAT'", "'FACTORYGAME_API'", 
		undefined, "'&'", "'/'", "'!'", "'>'", "'}'", "')'", "']'", "':'", "','", 
		"'='", "'-'", "'<'", "'{'", "'('", "'['", "'%'", "'.'", "'|'", "'+'", 
		"'?'", "';'", "'\\'", "'*'", "'~'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "CLASS", "EXTERN", "CONST", "CONSTEXPR", "ENUM", "FALSE", "FORCEINLINE", 
		"FRIEND", "INLINE", "MUTABLE", "NAMESPACE", "OPERATOR", "OVERRIDE", "PRIVATE", 
		"PROTECTED", "PUBLIC", "STATIC", "STRUCT", "TEMPLATE", "TRUE", "TYPEDEF", 
		"TYPENAME", "USING", "VIRTUAL", "UCLASS", "UENUM", "UFUNCTION", "UINTERFACE", 
		"UMETA", "UPARAM", "UPROPERTY", "USTRUCT", "UE_DEPRECATED", "STAT", "SF_CLASS_TAG", 
		"SF_GENERATED_BODY", "AMPERSAND", "BACKSLASH", "BANG", "CLOSE_ANGLE", 
		"CLOSE_BRACE", "CLOSE_PAREN", "CLOSE_SQUARE", "COLON", "COMMA", "EQUALS", 
		"MINUS", "OPEN_ANGLE", "OPEN_BRACE", "OPEN_PAREN", "OPEN_SQUARE", "PERCENT", 
		"PERIOD", "PIPE", "PLUS", "QUESTION", "SEMICOLON", "SLASH", "STAR", "TILDE", 
		"IDENTIFIER", "STRING_LITERAL", "FLOAT_LITERAL", "INTEGER_LITERAL", "HEX_LITERAL", 
		"MultiLineMacro", "Directive", "LINE_COMMENT_START", "BLOCK_COMMENT_START", 
		"WHITESPACE", "LINE_COMMENT_END", "LINE_COMMENT_TEXT", "LINE_COMMENT_OTHER", 
		"BLOCK_COMMENT_END", "BLOCK_COMMENT_NEW_LINE", "BLOCK_COMMENT_TEXT", "BLOCK_COMMENT_OTHER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(SatisfactoryHeaderParser._LITERAL_NAMES, SatisfactoryHeaderParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return SatisfactoryHeaderParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "SatisfactoryHeaderParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return SatisfactoryHeaderParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return SatisfactoryHeaderParser._serializedATN; }

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(SatisfactoryHeaderParser._ATN, this);
	}
	// @RuleVersion(0)
	public file(): FileContext {
		let _localctx: FileContext = new FileContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, SatisfactoryHeaderParser.RULE_file);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 163;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.EXTERN) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.FORCEINLINE) | (1 << SatisfactoryHeaderParser.FRIEND) | (1 << SatisfactoryHeaderParser.INLINE) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.NAMESPACE) | (1 << SatisfactoryHeaderParser.OPERATOR) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.TEMPLATE) | (1 << SatisfactoryHeaderParser.TYPEDEF) | (1 << SatisfactoryHeaderParser.USING) | (1 << SatisfactoryHeaderParser.VIRTUAL) | (1 << SatisfactoryHeaderParser.UCLASS) | (1 << SatisfactoryHeaderParser.UENUM) | (1 << SatisfactoryHeaderParser.UINTERFACE) | (1 << SatisfactoryHeaderParser.UPARAM))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (SatisfactoryHeaderParser.USTRUCT - 32)) | (1 << (SatisfactoryHeaderParser.SEMICOLON - 32)) | (1 << (SatisfactoryHeaderParser.TILDE - 32)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 32)))) !== 0)) {
				{
				{
				this.state = 160;
				this.element();
				}
				}
				this.state = 165;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public element(): ElementContext {
		let _localctx: ElementContext = new ElementContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, SatisfactoryHeaderParser.RULE_element);
		try {
			this.state = 179;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 166;
				this.classDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 167;
				this.enumDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 168;
				this.namespaceDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 169;
				this.staticMethodCall();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 170;
				this.staticFunctionDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 171;
				this.staticArrayDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 172;
				this.staticInlineFunctionDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 173;
				this.staticPropertyDeclaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 174;
				this.typedef();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 175;
				this.usingNamespace();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 176;
				this.globalVariableDeclaration();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 177;
				this.genericEnumDeclaration();
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 178;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public value(): ValueContext {
		let _localctx: ValueContext = new ValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, SatisfactoryHeaderParser.RULE_value);
		try {
			this.state = 183;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 181;
				this.identifier();
				}
				break;
			case SatisfactoryHeaderParser.FALSE:
			case SatisfactoryHeaderParser.TRUE:
			case SatisfactoryHeaderParser.STRING_LITERAL:
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 182;
				this.literal();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, SatisfactoryHeaderParser.RULE_literal);
		try {
			this.state = 188;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 185;
				this.stringLiteral();
				}
				break;
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 186;
				this.numericLiteral();
				}
				break;
			case SatisfactoryHeaderParser.FALSE:
			case SatisfactoryHeaderParser.TRUE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 187;
				this.booleanLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public identifier(): IdentifierContext {
		let _localctx: IdentifierContext = new IdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, SatisfactoryHeaderParser.RULE_identifier);
		try {
			this.state = 195;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 4, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 190;
				this.match(SatisfactoryHeaderParser.IDENTIFIER);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 191;
				this.match(SatisfactoryHeaderParser.IDENTIFIER);
				this.state = 192;
				this.match(SatisfactoryHeaderParser.COLON);
				this.state = 193;
				this.match(SatisfactoryHeaderParser.COLON);
				this.state = 194;
				this.match(SatisfactoryHeaderParser.IDENTIFIER);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringLiteral(): StringLiteralContext {
		let _localctx: StringLiteralContext = new StringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, SatisfactoryHeaderParser.RULE_stringLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 197;
			this.match(SatisfactoryHeaderParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public numericLiteral(): NumericLiteralContext {
		let _localctx: NumericLiteralContext = new NumericLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, SatisfactoryHeaderParser.RULE_numericLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 199;
			_la = this._input.LA(1);
			if (!(((((_la - 63)) & ~0x1F) === 0 && ((1 << (_la - 63)) & ((1 << (SatisfactoryHeaderParser.FLOAT_LITERAL - 63)) | (1 << (SatisfactoryHeaderParser.INTEGER_LITERAL - 63)) | (1 << (SatisfactoryHeaderParser.HEX_LITERAL - 63)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public booleanLiteral(): BooleanLiteralContext {
		let _localctx: BooleanLiteralContext = new BooleanLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, SatisfactoryHeaderParser.RULE_booleanLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 201;
			_la = this._input.LA(1);
			if (!(_la === SatisfactoryHeaderParser.FALSE || _la === SatisfactoryHeaderParser.TRUE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeDeclaration(): TypeDeclarationContext {
		let _localctx: TypeDeclarationContext = new TypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, SatisfactoryHeaderParser.RULE_typeDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 206;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.UPARAM))) !== 0)) {
				{
				{
				this.state = 203;
				this.typeModifier();
				}
				}
				this.state = 208;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 209;
			this.identifier();
			this.state = 211;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 6, this._ctx) ) {
			case 1:
				{
				this.state = 210;
				this.typeModifier();
				}
				break;
			}
			this.state = 214;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.OPEN_ANGLE) {
				{
				this.state = 213;
				this.templateType();
				}
			}

			this.state = 217;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.AMPERSAND || _la === SatisfactoryHeaderParser.STAR) {
				{
				this.state = 216;
				this.typeReferenceType();
				}
			}

			this.state = 220;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.CONSTEXPR) {
				{
				this.state = 219;
				this.match(SatisfactoryHeaderParser.CONSTEXPR);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateType(): TemplateTypeContext {
		let _localctx: TemplateTypeContext = new TemplateTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, SatisfactoryHeaderParser.RULE_templateType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 222;
			this.contentWithNestedAngles();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeModifier(): TypeModifierContext {
		let _localctx: TypeModifierContext = new TypeModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, SatisfactoryHeaderParser.RULE_typeModifier);
		try {
			this.state = 232;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.CLASS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 224;
				this.match(SatisfactoryHeaderParser.CLASS);
				}
				break;
			case SatisfactoryHeaderParser.CONST:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 225;
				this.match(SatisfactoryHeaderParser.CONST);
				}
				break;
			case SatisfactoryHeaderParser.CONSTEXPR:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 226;
				this.match(SatisfactoryHeaderParser.CONSTEXPR);
				}
				break;
			case SatisfactoryHeaderParser.ENUM:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 227;
				this.match(SatisfactoryHeaderParser.ENUM);
				}
				break;
			case SatisfactoryHeaderParser.STRUCT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 228;
				this.match(SatisfactoryHeaderParser.STRUCT);
				}
				break;
			case SatisfactoryHeaderParser.STATIC:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 229;
				this.match(SatisfactoryHeaderParser.STATIC);
				}
				break;
			case SatisfactoryHeaderParser.MUTABLE:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 230;
				this.match(SatisfactoryHeaderParser.MUTABLE);
				}
				break;
			case SatisfactoryHeaderParser.UPARAM:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 231;
				this.uParamMacro();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeReferenceType(): TypeReferenceTypeContext {
		let _localctx: TypeReferenceTypeContext = new TypeReferenceTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, SatisfactoryHeaderParser.RULE_typeReferenceType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 234;
			_la = this._input.LA(1);
			if (!(_la === SatisfactoryHeaderParser.AMPERSAND || _la === SatisfactoryHeaderParser.STAR)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public globalVariableDeclaration(): GlobalVariableDeclarationContext {
		let _localctx: GlobalVariableDeclarationContext = new GlobalVariableDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, SatisfactoryHeaderParser.RULE_globalVariableDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 236;
			this.match(SatisfactoryHeaderParser.EXTERN);
			this.state = 238;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 11, this._ctx) ) {
			case 1:
				{
				this.state = 237;
				this.typeDeclaration();
				}
				break;
			}
			this.state = 240;
			this.identifier();
			this.state = 242;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.OPEN_SQUARE) {
				{
				this.state = 241;
				this.contentWithNestedSquares();
				}
			}

			this.state = 245;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COLON || _la === SatisfactoryHeaderParser.EQUALS) {
				{
				this.state = 244;
				this.classPropertyDefaultValue();
				}
			}

			this.state = 247;
			this.match(SatisfactoryHeaderParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classDeclaration(): ClassDeclarationContext {
		let _localctx: ClassDeclarationContext = new ClassDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, SatisfactoryHeaderParser.RULE_classDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 249;
			this.classHeader();
			this.state = 250;
			this.match(SatisfactoryHeaderParser.OPEN_BRACE);
			this.state = 251;
			this.classBody();
			this.state = 252;
			this.match(SatisfactoryHeaderParser.CLOSE_BRACE);
			this.state = 254;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 14, this._ctx) ) {
			case 1:
				{
				this.state = 253;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classHeader(): ClassHeaderContext {
		let _localctx: ClassHeaderContext = new ClassHeaderContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, SatisfactoryHeaderParser.RULE_classHeader);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 257;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (((((_la - 25)) & ~0x1F) === 0 && ((1 << (_la - 25)) & ((1 << (SatisfactoryHeaderParser.UCLASS - 25)) | (1 << (SatisfactoryHeaderParser.UINTERFACE - 25)) | (1 << (SatisfactoryHeaderParser.USTRUCT - 25)))) !== 0)) {
				{
				this.state = 256;
				this.classMacro();
				}
			}

			this.state = 260;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.TEMPLATE) {
				{
				this.state = 259;
				this.templateDeclaration();
				}
			}

			this.state = 262;
			this.classKeyword();
			this.state = 264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.SF_CLASS_TAG) {
				{
				this.state = 263;
				this.match(SatisfactoryHeaderParser.SF_CLASS_TAG);
				}
			}

			this.state = 266;
			this.identifier();
			this.state = 268;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.OPEN_ANGLE) {
				{
				this.state = 267;
				this.contentWithNestedAngles();
				}
			}

			this.state = 271;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COLON) {
				{
				this.state = 270;
				this.classInheritance();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classMacro(): ClassMacroContext {
		let _localctx: ClassMacroContext = new ClassMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, SatisfactoryHeaderParser.RULE_classMacro);
		try {
			this.state = 276;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.UCLASS:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 273;
				this.uclassMacro();
				}
				break;
			case SatisfactoryHeaderParser.UINTERFACE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 274;
				this.uinterfaceMacro();
				}
				break;
			case SatisfactoryHeaderParser.USTRUCT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 275;
				this.ustructMacro();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public templateDeclaration(): TemplateDeclarationContext {
		let _localctx: TemplateDeclarationContext = new TemplateDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, SatisfactoryHeaderParser.RULE_templateDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 278;
			this.match(SatisfactoryHeaderParser.TEMPLATE);
			this.state = 279;
			this.contentWithNestedAngles();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classKeyword(): ClassKeywordContext {
		let _localctx: ClassKeywordContext = new ClassKeywordContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, SatisfactoryHeaderParser.RULE_classKeyword);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 281;
			_la = this._input.LA(1);
			if (!(_la === SatisfactoryHeaderParser.CLASS || _la === SatisfactoryHeaderParser.STRUCT)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classInheritance(): ClassInheritanceContext {
		let _localctx: ClassInheritanceContext = new ClassInheritanceContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, SatisfactoryHeaderParser.RULE_classInheritance);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 283;
			this.match(SatisfactoryHeaderParser.COLON);
			this.state = 284;
			this.classExtensionList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classExtensionList(): ClassExtensionListContext {
		let _localctx: ClassExtensionListContext = new ClassExtensionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, SatisfactoryHeaderParser.RULE_classExtensionList);
		try {
			this.state = 291;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 21, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 286;
				this.classExtension();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 287;
				this.classExtension();
				this.state = 288;
				this.match(SatisfactoryHeaderParser.COMMA);
				this.state = 289;
				this.classExtensionList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classExtension(): ClassExtensionContext {
		let _localctx: ClassExtensionContext = new ClassExtensionContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, SatisfactoryHeaderParser.RULE_classExtension);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 294;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC))) !== 0)) {
				{
				this.state = 293;
				this.classVisibilityModifier();
				}
			}

			this.state = 296;
			this.identifier();
			this.state = 298;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.OPEN_ANGLE) {
				{
				this.state = 297;
				this.contentWithNestedAngles();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classBody(): ClassBodyContext {
		let _localctx: ClassBodyContext = new ClassBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, SatisfactoryHeaderParser.RULE_classBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 301;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.FORCEINLINE) | (1 << SatisfactoryHeaderParser.FRIEND) | (1 << SatisfactoryHeaderParser.INLINE) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.OPERATOR) | (1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.TEMPLATE) | (1 << SatisfactoryHeaderParser.TYPEDEF) | (1 << SatisfactoryHeaderParser.VIRTUAL) | (1 << SatisfactoryHeaderParser.UFUNCTION) | (1 << SatisfactoryHeaderParser.UPARAM) | (1 << SatisfactoryHeaderParser.UPROPERTY))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (SatisfactoryHeaderParser.UE_DEPRECATED - 33)) | (1 << (SatisfactoryHeaderParser.STAT - 33)) | (1 << (SatisfactoryHeaderParser.SF_GENERATED_BODY - 33)) | (1 << (SatisfactoryHeaderParser.SEMICOLON - 33)) | (1 << (SatisfactoryHeaderParser.TILDE - 33)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 33)))) !== 0)) {
				{
				this.state = 300;
				this.classEntries();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classEntries(): ClassEntriesContext {
		let _localctx: ClassEntriesContext = new ClassEntriesContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, SatisfactoryHeaderParser.RULE_classEntries);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 303;
			this.classEntry();
			this.state = 305;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.FORCEINLINE) | (1 << SatisfactoryHeaderParser.FRIEND) | (1 << SatisfactoryHeaderParser.INLINE) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.OPERATOR) | (1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.TEMPLATE) | (1 << SatisfactoryHeaderParser.TYPEDEF) | (1 << SatisfactoryHeaderParser.VIRTUAL) | (1 << SatisfactoryHeaderParser.UFUNCTION) | (1 << SatisfactoryHeaderParser.UPARAM) | (1 << SatisfactoryHeaderParser.UPROPERTY))) !== 0) || ((((_la - 33)) & ~0x1F) === 0 && ((1 << (_la - 33)) & ((1 << (SatisfactoryHeaderParser.UE_DEPRECATED - 33)) | (1 << (SatisfactoryHeaderParser.STAT - 33)) | (1 << (SatisfactoryHeaderParser.SF_GENERATED_BODY - 33)) | (1 << (SatisfactoryHeaderParser.SEMICOLON - 33)) | (1 << (SatisfactoryHeaderParser.TILDE - 33)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 33)))) !== 0)) {
				{
				this.state = 304;
				this.classEntries();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classEntry(): ClassEntryContext {
		let _localctx: ClassEntryContext = new ClassEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, SatisfactoryHeaderParser.RULE_classEntry);
		try {
			this.state = 319;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 26, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 307;
				this.classVisibility();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 308;
				this.classMethod();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 309;
				this.friendDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 310;
				this.classProperty();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 311;
				this.statDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 312;
				this.nestedEnum();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 313;
				this.nestedEnumClass();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 314;
				this.nestedClass();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 315;
				this.nestedStruct();
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 316;
				this.typedef();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 317;
				this.generatedBodyMacro();
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 318;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classVisibility(): ClassVisibilityContext {
		let _localctx: ClassVisibilityContext = new ClassVisibilityContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, SatisfactoryHeaderParser.RULE_classVisibility);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 321;
			this.classVisibilityModifier();
			this.state = 322;
			this.match(SatisfactoryHeaderParser.COLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classVisibilityModifier(): ClassVisibilityModifierContext {
		let _localctx: ClassVisibilityModifierContext = new ClassVisibilityModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, SatisfactoryHeaderParser.RULE_classVisibilityModifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 324;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public friendDeclaration(): FriendDeclarationContext {
		let _localctx: FriendDeclarationContext = new FriendDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, SatisfactoryHeaderParser.RULE_friendDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 326;
			this.match(SatisfactoryHeaderParser.FRIEND);
			this.state = 328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.CLASS || _la === SatisfactoryHeaderParser.STRUCT) {
				{
				this.state = 327;
				this.classKeyword();
				}
			}

			this.state = 330;
			this.identifier();
			this.state = 331;
			this.match(SatisfactoryHeaderParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statDeclaration(): StatDeclarationContext {
		let _localctx: StatDeclarationContext = new StatDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, SatisfactoryHeaderParser.RULE_statDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 333;
			this.match(SatisfactoryHeaderParser.STAT);
			this.state = 334;
			this.contentWithNestedParens();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classMethod(): ClassMethodContext {
		let _localctx: ClassMethodContext = new ClassMethodContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, SatisfactoryHeaderParser.RULE_classMethod);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 337;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.UE_DEPRECATED) {
				{
				this.state = 336;
				this.uedeprecatedMacro();
				}
			}

			this.state = 340;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 29, this._ctx) ) {
			case 1:
				{
				this.state = 339;
				this.ufunctionMacro();
				}
				break;
			}
			this.state = 345;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 342;
					this.functionModifier();
					}
					}
				}
				this.state = 347;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 30, this._ctx);
			}
			this.state = 349;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 31, this._ctx) ) {
			case 1:
				{
				this.state = 348;
				this.typeDeclaration();
				}
				break;
			}
			this.state = 351;
			this.functionName();
			this.state = 352;
			this.contentWithNestedParens();
			this.state = 356;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 353;
					this.classMethodResultModifier();
					}
					}
				}
				this.state = 358;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 32, this._ctx);
			}
			this.state = 359;
			this.classMethodEnd();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classMethodEnd(): ClassMethodEndContext {
		let _localctx: ClassMethodEndContext = new ClassMethodEndContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, SatisfactoryHeaderParser.RULE_classMethodEnd);
		try {
			this.state = 378;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.CLASS:
			case SatisfactoryHeaderParser.CONST:
			case SatisfactoryHeaderParser.CONSTEXPR:
			case SatisfactoryHeaderParser.ENUM:
			case SatisfactoryHeaderParser.FORCEINLINE:
			case SatisfactoryHeaderParser.FRIEND:
			case SatisfactoryHeaderParser.INLINE:
			case SatisfactoryHeaderParser.MUTABLE:
			case SatisfactoryHeaderParser.OPERATOR:
			case SatisfactoryHeaderParser.PRIVATE:
			case SatisfactoryHeaderParser.PROTECTED:
			case SatisfactoryHeaderParser.PUBLIC:
			case SatisfactoryHeaderParser.STATIC:
			case SatisfactoryHeaderParser.STRUCT:
			case SatisfactoryHeaderParser.TEMPLATE:
			case SatisfactoryHeaderParser.TYPEDEF:
			case SatisfactoryHeaderParser.VIRTUAL:
			case SatisfactoryHeaderParser.UFUNCTION:
			case SatisfactoryHeaderParser.UPARAM:
			case SatisfactoryHeaderParser.UPROPERTY:
			case SatisfactoryHeaderParser.UE_DEPRECATED:
			case SatisfactoryHeaderParser.STAT:
			case SatisfactoryHeaderParser.SF_GENERATED_BODY:
			case SatisfactoryHeaderParser.CLOSE_BRACE:
			case SatisfactoryHeaderParser.SEMICOLON:
			case SatisfactoryHeaderParser.TILDE:
			case SatisfactoryHeaderParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 362;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 33, this._ctx) ) {
				case 1:
					{
					this.state = 361;
					this.match(SatisfactoryHeaderParser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case SatisfactoryHeaderParser.OPEN_BRACE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 364;
				this.contentWithNestedBraces();
				this.state = 366;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 34, this._ctx) ) {
				case 1:
					{
					this.state = 365;
					this.match(SatisfactoryHeaderParser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case SatisfactoryHeaderParser.COLON:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 368;
				this.match(SatisfactoryHeaderParser.COLON);
				this.state = 369;
				this.classInitializerList();
				this.state = 370;
				this.contentWithNestedBraces();
				this.state = 372;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
				case 1:
					{
					this.state = 371;
					this.match(SatisfactoryHeaderParser.SEMICOLON);
					}
					break;
				}
				}
				break;
			case SatisfactoryHeaderParser.EQUALS:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 374;
				this.match(SatisfactoryHeaderParser.EQUALS);
				this.state = 375;
				this.numericLiteral();
				this.state = 376;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classMethodResultModifier(): ClassMethodResultModifierContext {
		let _localctx: ClassMethodResultModifierContext = new ClassMethodResultModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, SatisfactoryHeaderParser.RULE_classMethodResultModifier);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 380;
			_la = this._input.LA(1);
			if (!(_la === SatisfactoryHeaderParser.CONST || _la === SatisfactoryHeaderParser.OVERRIDE)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classInitializerList(): ClassInitializerListContext {
		let _localctx: ClassInitializerListContext = new ClassInitializerListContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, SatisfactoryHeaderParser.RULE_classInitializerList);
		try {
			this.state = 387;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 37, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 382;
				this.classInitializer();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 383;
				this.classInitializer();
				this.state = 384;
				this.match(SatisfactoryHeaderParser.COMMA);
				this.state = 385;
				this.classInitializerList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classInitializer(): ClassInitializerContext {
		let _localctx: ClassInitializerContext = new ClassInitializerContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, SatisfactoryHeaderParser.RULE_classInitializer);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 389;
			this.identifier();
			this.state = 390;
			this.contentWithNestedParens();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classProperty(): ClassPropertyContext {
		let _localctx: ClassPropertyContext = new ClassPropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, SatisfactoryHeaderParser.RULE_classProperty);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 393;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.UPROPERTY) {
				{
				this.state = 392;
				this.upropertyMacro();
				}
			}

			this.state = 396;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 39, this._ctx) ) {
			case 1:
				{
				this.state = 395;
				this.typeDeclaration();
				}
				break;
			}
			this.state = 398;
			this.identifier();
			this.state = 400;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.OPEN_SQUARE) {
				{
				this.state = 399;
				this.contentWithNestedSquares();
				}
			}

			this.state = 403;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COLON || _la === SatisfactoryHeaderParser.EQUALS) {
				{
				this.state = 402;
				this.classPropertyDefaultValue();
				}
			}

			this.state = 405;
			this.match(SatisfactoryHeaderParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classPropertyDefaultValue(): ClassPropertyDefaultValueContext {
		let _localctx: ClassPropertyDefaultValueContext = new ClassPropertyDefaultValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, SatisfactoryHeaderParser.RULE_classPropertyDefaultValue);
		try {
			this.state = 419;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 42, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 407;
				this.match(SatisfactoryHeaderParser.COLON);
				this.state = 408;
				this.literal();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 409;
				this.match(SatisfactoryHeaderParser.EQUALS);
				this.state = 410;
				this.identifier();
				this.state = 411;
				this.contentWithNestedParens();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 413;
				this.match(SatisfactoryHeaderParser.EQUALS);
				this.state = 414;
				this.identifier();
				this.state = 415;
				this.contentWithNestedBraces();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 417;
				this.match(SatisfactoryHeaderParser.EQUALS);
				this.state = 418;
				this.literalExpression(0);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public literalExpression(): LiteralExpressionContext;
	public literalExpression(_p: number): LiteralExpressionContext;
	// @RuleVersion(0)
	public literalExpression(_p?: number): LiteralExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: LiteralExpressionContext = new LiteralExpressionContext(this._ctx, _parentState);
		let _prevctx: LiteralExpressionContext = _localctx;
		let _startState: number = 70;
		this.enterRecursionRule(_localctx, 70, SatisfactoryHeaderParser.RULE_literalExpression, _p);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 424;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.FALSE:
			case SatisfactoryHeaderParser.TRUE:
			case SatisfactoryHeaderParser.STRING_LITERAL:
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
				{
				this.state = 422;
				this.literal();
				}
				break;
			case SatisfactoryHeaderParser.IDENTIFIER:
				{
				this.state = 423;
				this.identifier();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 440;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 438;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
					case 1:
						{
						_localctx = new LiteralExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, SatisfactoryHeaderParser.RULE_literalExpression);
						this.state = 426;
						if (!(this.precpred(this._ctx, 4))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 4)");
						}
						this.state = 427;
						this.match(SatisfactoryHeaderParser.PLUS);
						this.state = 428;
						this.literalExpression(5);
						}
						break;

					case 2:
						{
						_localctx = new LiteralExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, SatisfactoryHeaderParser.RULE_literalExpression);
						this.state = 429;
						if (!(this.precpred(this._ctx, 3))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 3)");
						}
						this.state = 430;
						this.match(SatisfactoryHeaderParser.MINUS);
						this.state = 431;
						this.literalExpression(4);
						}
						break;

					case 3:
						{
						_localctx = new LiteralExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, SatisfactoryHeaderParser.RULE_literalExpression);
						this.state = 432;
						if (!(this.precpred(this._ctx, 2))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 2)");
						}
						this.state = 433;
						this.match(SatisfactoryHeaderParser.STAR);
						this.state = 434;
						this.literalExpression(3);
						}
						break;

					case 4:
						{
						_localctx = new LiteralExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, SatisfactoryHeaderParser.RULE_literalExpression);
						this.state = 435;
						if (!(this.precpred(this._ctx, 1))) {
							throw new FailedPredicateException(this, "this.precpred(this._ctx, 1)");
						}
						this.state = 436;
						this.match(SatisfactoryHeaderParser.BACKSLASH);
						this.state = 437;
						this.literalExpression(2);
						}
						break;
					}
					}
				}
				this.state = 442;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 45, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classPropertyArraySize(): ClassPropertyArraySizeContext {
		let _localctx: ClassPropertyArraySizeContext = new ClassPropertyArraySizeContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, SatisfactoryHeaderParser.RULE_classPropertyArraySize);
		try {
			this.state = 445;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 443;
				this.identifier();
				}
				break;
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 444;
				this.numericLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nestedEnum(): NestedEnumContext {
		let _localctx: NestedEnumContext = new NestedEnumContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, SatisfactoryHeaderParser.RULE_nestedEnum);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 447;
			this.match(SatisfactoryHeaderParser.ENUM);
			this.state = 449;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.IDENTIFIER) {
				{
				this.state = 448;
				this.identifier();
				}
			}

			this.state = 451;
			this.contentWithNestedBraces();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nestedEnumInheritance(): NestedEnumInheritanceContext {
		let _localctx: NestedEnumInheritanceContext = new NestedEnumInheritanceContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, SatisfactoryHeaderParser.RULE_nestedEnumInheritance);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 453;
			this.match(SatisfactoryHeaderParser.COLON);
			this.state = 454;
			this.match(SatisfactoryHeaderParser.IDENTIFIER);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nestedEnumClass(): NestedEnumClassContext {
		let _localctx: NestedEnumClassContext = new NestedEnumClassContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, SatisfactoryHeaderParser.RULE_nestedEnumClass);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 456;
			this.match(SatisfactoryHeaderParser.ENUM);
			this.state = 457;
			this.match(SatisfactoryHeaderParser.CLASS);
			this.state = 458;
			this.identifier();
			this.state = 460;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COLON) {
				{
				this.state = 459;
				this.nestedEnumInheritance();
				}
			}

			this.state = 462;
			this.contentWithNestedBraces();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nestedClass(): NestedClassContext {
		let _localctx: NestedClassContext = new NestedClassContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, SatisfactoryHeaderParser.RULE_nestedClass);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 464;
			this.match(SatisfactoryHeaderParser.CLASS);
			this.state = 465;
			this.identifier();
			this.state = 467;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COLON) {
				{
				this.state = 466;
				this.classInheritance();
				}
			}

			this.state = 469;
			this.contentWithNestedBraces();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nestedStruct(): NestedStructContext {
		let _localctx: NestedStructContext = new NestedStructContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, SatisfactoryHeaderParser.RULE_nestedStruct);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 471;
			this.match(SatisfactoryHeaderParser.STRUCT);
			this.state = 472;
			this.identifier();
			this.state = 474;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COLON) {
				{
				this.state = 473;
				this.classInheritance();
				}
			}

			this.state = 476;
			this.contentWithNestedBraces();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public genericEnumDeclaration(): GenericEnumDeclarationContext {
		let _localctx: GenericEnumDeclarationContext = new GenericEnumDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, SatisfactoryHeaderParser.RULE_genericEnumDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 478;
			this.match(SatisfactoryHeaderParser.ENUM);
			this.state = 479;
			this.match(SatisfactoryHeaderParser.OPEN_BRACE);
			this.state = 480;
			this.enumBody();
			this.state = 482;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COMMA) {
				{
				this.state = 481;
				this.match(SatisfactoryHeaderParser.COMMA);
				}
			}

			this.state = 484;
			this.match(SatisfactoryHeaderParser.CLOSE_BRACE);
			this.state = 486;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 52, this._ctx) ) {
			case 1:
				{
				this.state = 485;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumDeclaration(): EnumDeclarationContext {
		let _localctx: EnumDeclarationContext = new EnumDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, SatisfactoryHeaderParser.RULE_enumDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 488;
			this.enumHeader();
			this.state = 489;
			this.match(SatisfactoryHeaderParser.OPEN_BRACE);
			this.state = 490;
			this.enumBody();
			this.state = 492;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.COMMA) {
				{
				this.state = 491;
				this.match(SatisfactoryHeaderParser.COMMA);
				}
			}

			this.state = 494;
			this.match(SatisfactoryHeaderParser.CLOSE_BRACE);
			this.state = 496;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 54, this._ctx) ) {
			case 1:
				{
				this.state = 495;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumHeader(): EnumHeaderContext {
		let _localctx: EnumHeaderContext = new EnumHeaderContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, SatisfactoryHeaderParser.RULE_enumHeader);
		let _la: number;
		try {
			this.state = 517;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 59, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 499;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SatisfactoryHeaderParser.UENUM) {
					{
					this.state = 498;
					this.uenumMacro();
					}
				}

				this.state = 501;
				this.match(SatisfactoryHeaderParser.ENUM);
				this.state = 503;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SatisfactoryHeaderParser.CLASS) {
					{
					this.state = 502;
					this.match(SatisfactoryHeaderParser.CLASS);
					}
				}

				this.state = 505;
				this.identifier();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 507;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SatisfactoryHeaderParser.UENUM) {
					{
					this.state = 506;
					this.uenumMacro();
					}
				}

				this.state = 509;
				this.match(SatisfactoryHeaderParser.ENUM);
				this.state = 511;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SatisfactoryHeaderParser.CLASS) {
					{
					this.state = 510;
					this.match(SatisfactoryHeaderParser.CLASS);
					}
				}

				this.state = 513;
				this.identifier();
				this.state = 514;
				this.match(SatisfactoryHeaderParser.COLON);
				this.state = 515;
				this.typeDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumBody(): EnumBodyContext {
		let _localctx: EnumBodyContext = new EnumBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, SatisfactoryHeaderParser.RULE_enumBody);
		try {
			this.state = 524;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 60, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 519;
				this.enumEntry();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 520;
				this.enumEntry();
				this.state = 521;
				this.match(SatisfactoryHeaderParser.COMMA);
				this.state = 522;
				this.enumBody();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumEntry(): EnumEntryContext {
		let _localctx: EnumEntryContext = new EnumEntryContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, SatisfactoryHeaderParser.RULE_enumEntry);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 526;
			this.identifier();
			this.state = 528;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.EQUALS) {
				{
				this.state = 527;
				this.enumValue();
				}
			}

			this.state = 531;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.UMETA) {
				{
				this.state = 530;
				this.umetaMacro();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumValue(): EnumValueContext {
		let _localctx: EnumValueContext = new EnumValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, SatisfactoryHeaderParser.RULE_enumValue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 533;
			this.match(SatisfactoryHeaderParser.EQUALS);
			this.state = 534;
			this.literal();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticFunctionDeclaration(): StaticFunctionDeclarationContext {
		let _localctx: StaticFunctionDeclarationContext = new StaticFunctionDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, SatisfactoryHeaderParser.RULE_staticFunctionDeclaration);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 539;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 63, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 536;
					this.functionModifier();
					}
					}
				}
				this.state = 541;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 63, this._ctx);
			}
			this.state = 543;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 64, this._ctx) ) {
			case 1:
				{
				this.state = 542;
				this.typeDeclaration();
				}
				break;
			}
			this.state = 545;
			this.functionName();
			this.state = 546;
			this.contentWithNestedParens();
			this.state = 548;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 65, this._ctx) ) {
			case 1:
				{
				this.state = 547;
				this.match(SatisfactoryHeaderParser.CONST);
				}
				break;
			}
			this.state = 551;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.OPEN_BRACE) {
				{
				this.state = 550;
				this.contentWithNestedBraces();
				}
			}

			this.state = 554;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 67, this._ctx) ) {
			case 1:
				{
				this.state = 553;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticArrayDeclaration(): StaticArrayDeclarationContext {
		let _localctx: StaticArrayDeclarationContext = new StaticArrayDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, SatisfactoryHeaderParser.RULE_staticArrayDeclaration);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 559;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 556;
					this.functionModifier();
					}
					}
				}
				this.state = 561;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			}
			this.state = 563;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 69, this._ctx) ) {
			case 1:
				{
				this.state = 562;
				this.typeDeclaration();
				}
				break;
			}
			this.state = 565;
			this.functionName();
			this.state = 566;
			this.match(SatisfactoryHeaderParser.EQUALS);
			this.state = 567;
			this.contentWithNestedBraces();
			this.state = 568;
			this.match(SatisfactoryHeaderParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticPropertyDeclaration(): StaticPropertyDeclarationContext {
		let _localctx: StaticPropertyDeclarationContext = new StaticPropertyDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, SatisfactoryHeaderParser.RULE_staticPropertyDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 570;
			this.match(SatisfactoryHeaderParser.STATIC);
			this.state = 571;
			this.typeDeclaration();
			this.state = 572;
			this.identifier();
			this.state = 573;
			this.match(SatisfactoryHeaderParser.EQUALS);
			this.state = 574;
			this.literal();
			this.state = 575;
			this.match(SatisfactoryHeaderParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticInlineFunctionDeclaration(): StaticInlineFunctionDeclarationContext {
		let _localctx: StaticInlineFunctionDeclarationContext = new StaticInlineFunctionDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, SatisfactoryHeaderParser.RULE_staticInlineFunctionDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 577;
			this.match(SatisfactoryHeaderParser.FORCEINLINE);
			this.state = 578;
			this.typeDeclaration();
			this.state = 579;
			this.identifier();
			this.state = 580;
			this.contentWithNestedParens();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticMethodCall(): StaticMethodCallContext {
		let _localctx: StaticMethodCallContext = new StaticMethodCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, SatisfactoryHeaderParser.RULE_staticMethodCall);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 582;
			this.identifier();
			this.state = 583;
			this.contentWithNestedParens();
			this.state = 584;
			this.match(SatisfactoryHeaderParser.SEMICOLON);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typedef(): TypedefContext {
		let _localctx: TypedefContext = new TypedefContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, SatisfactoryHeaderParser.RULE_typedef);
		let _la: number;
		try {
			this.state = 602;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.TYPEDEF:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 586;
				this.match(SatisfactoryHeaderParser.TYPEDEF);
				this.state = 588;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SatisfactoryHeaderParser.TYPENAME) {
					{
					this.state = 587;
					this.match(SatisfactoryHeaderParser.TYPENAME);
					}
				}

				this.state = 590;
				this.typeDeclaration();
				this.state = 591;
				this.identifier();
				this.state = 592;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			case SatisfactoryHeaderParser.CLASS:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 594;
				this.match(SatisfactoryHeaderParser.CLASS);
				this.state = 595;
				this.identifier();
				this.state = 596;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			case SatisfactoryHeaderParser.STRUCT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 598;
				this.match(SatisfactoryHeaderParser.STRUCT);
				this.state = 599;
				this.identifier();
				this.state = 600;
				this.match(SatisfactoryHeaderParser.SEMICOLON);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedParens(): ContentWithNestedParensContext {
		let _localctx: ContentWithNestedParensContext = new ContentWithNestedParensContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, SatisfactoryHeaderParser.RULE_contentWithNestedParens);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 604;
			this.match(SatisfactoryHeaderParser.OPEN_PAREN);
			this.state = 608;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.EXTERN) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.FALSE) | (1 << SatisfactoryHeaderParser.FORCEINLINE) | (1 << SatisfactoryHeaderParser.FRIEND) | (1 << SatisfactoryHeaderParser.INLINE) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.NAMESPACE) | (1 << SatisfactoryHeaderParser.OPERATOR) | (1 << SatisfactoryHeaderParser.OVERRIDE) | (1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.TEMPLATE) | (1 << SatisfactoryHeaderParser.TRUE) | (1 << SatisfactoryHeaderParser.TYPEDEF) | (1 << SatisfactoryHeaderParser.TYPENAME) | (1 << SatisfactoryHeaderParser.USING) | (1 << SatisfactoryHeaderParser.VIRTUAL) | (1 << SatisfactoryHeaderParser.UCLASS) | (1 << SatisfactoryHeaderParser.UENUM) | (1 << SatisfactoryHeaderParser.UFUNCTION) | (1 << SatisfactoryHeaderParser.UINTERFACE) | (1 << SatisfactoryHeaderParser.UMETA) | (1 << SatisfactoryHeaderParser.UPARAM) | (1 << SatisfactoryHeaderParser.UPROPERTY))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (SatisfactoryHeaderParser.USTRUCT - 32)) | (1 << (SatisfactoryHeaderParser.UE_DEPRECATED - 32)) | (1 << (SatisfactoryHeaderParser.STAT - 32)) | (1 << (SatisfactoryHeaderParser.SF_CLASS_TAG - 32)) | (1 << (SatisfactoryHeaderParser.SF_GENERATED_BODY - 32)) | (1 << (SatisfactoryHeaderParser.AMPERSAND - 32)) | (1 << (SatisfactoryHeaderParser.BACKSLASH - 32)) | (1 << (SatisfactoryHeaderParser.BANG - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_ANGLE - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_BRACE - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_SQUARE - 32)) | (1 << (SatisfactoryHeaderParser.COLON - 32)) | (1 << (SatisfactoryHeaderParser.COMMA - 32)) | (1 << (SatisfactoryHeaderParser.EQUALS - 32)) | (1 << (SatisfactoryHeaderParser.MINUS - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_ANGLE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_BRACE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_PAREN - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_SQUARE - 32)) | (1 << (SatisfactoryHeaderParser.PERCENT - 32)) | (1 << (SatisfactoryHeaderParser.PERIOD - 32)) | (1 << (SatisfactoryHeaderParser.PIPE - 32)) | (1 << (SatisfactoryHeaderParser.PLUS - 32)) | (1 << (SatisfactoryHeaderParser.QUESTION - 32)) | (1 << (SatisfactoryHeaderParser.SEMICOLON - 32)) | (1 << (SatisfactoryHeaderParser.SLASH - 32)) | (1 << (SatisfactoryHeaderParser.STAR - 32)) | (1 << (SatisfactoryHeaderParser.TILDE - 32)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 32)) | (1 << (SatisfactoryHeaderParser.STRING_LITERAL - 32)) | (1 << (SatisfactoryHeaderParser.FLOAT_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (SatisfactoryHeaderParser.INTEGER_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.HEX_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.MultiLineMacro - 64)) | (1 << (SatisfactoryHeaderParser.Directive - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.WHITESPACE - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_OTHER - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER - 64)))) !== 0)) {
				{
				{
				this.state = 605;
				this.contentWithNestedParensInner();
				}
				}
				this.state = 610;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 611;
			this.match(SatisfactoryHeaderParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedParensInner(): ContentWithNestedParensInnerContext {
		let _localctx: ContentWithNestedParensInnerContext = new ContentWithNestedParensInnerContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, SatisfactoryHeaderParser.RULE_contentWithNestedParensInner);
		let _la: number;
		try {
			let _alt: number;
			this.state = 619;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.CLASS:
			case SatisfactoryHeaderParser.EXTERN:
			case SatisfactoryHeaderParser.CONST:
			case SatisfactoryHeaderParser.CONSTEXPR:
			case SatisfactoryHeaderParser.ENUM:
			case SatisfactoryHeaderParser.FALSE:
			case SatisfactoryHeaderParser.FORCEINLINE:
			case SatisfactoryHeaderParser.FRIEND:
			case SatisfactoryHeaderParser.INLINE:
			case SatisfactoryHeaderParser.MUTABLE:
			case SatisfactoryHeaderParser.NAMESPACE:
			case SatisfactoryHeaderParser.OPERATOR:
			case SatisfactoryHeaderParser.OVERRIDE:
			case SatisfactoryHeaderParser.PRIVATE:
			case SatisfactoryHeaderParser.PROTECTED:
			case SatisfactoryHeaderParser.PUBLIC:
			case SatisfactoryHeaderParser.STATIC:
			case SatisfactoryHeaderParser.STRUCT:
			case SatisfactoryHeaderParser.TEMPLATE:
			case SatisfactoryHeaderParser.TRUE:
			case SatisfactoryHeaderParser.TYPEDEF:
			case SatisfactoryHeaderParser.TYPENAME:
			case SatisfactoryHeaderParser.USING:
			case SatisfactoryHeaderParser.VIRTUAL:
			case SatisfactoryHeaderParser.UCLASS:
			case SatisfactoryHeaderParser.UENUM:
			case SatisfactoryHeaderParser.UFUNCTION:
			case SatisfactoryHeaderParser.UINTERFACE:
			case SatisfactoryHeaderParser.UMETA:
			case SatisfactoryHeaderParser.UPARAM:
			case SatisfactoryHeaderParser.UPROPERTY:
			case SatisfactoryHeaderParser.USTRUCT:
			case SatisfactoryHeaderParser.UE_DEPRECATED:
			case SatisfactoryHeaderParser.STAT:
			case SatisfactoryHeaderParser.SF_CLASS_TAG:
			case SatisfactoryHeaderParser.SF_GENERATED_BODY:
			case SatisfactoryHeaderParser.AMPERSAND:
			case SatisfactoryHeaderParser.BACKSLASH:
			case SatisfactoryHeaderParser.BANG:
			case SatisfactoryHeaderParser.CLOSE_ANGLE:
			case SatisfactoryHeaderParser.CLOSE_BRACE:
			case SatisfactoryHeaderParser.CLOSE_SQUARE:
			case SatisfactoryHeaderParser.COLON:
			case SatisfactoryHeaderParser.COMMA:
			case SatisfactoryHeaderParser.EQUALS:
			case SatisfactoryHeaderParser.MINUS:
			case SatisfactoryHeaderParser.OPEN_ANGLE:
			case SatisfactoryHeaderParser.OPEN_BRACE:
			case SatisfactoryHeaderParser.OPEN_SQUARE:
			case SatisfactoryHeaderParser.PERCENT:
			case SatisfactoryHeaderParser.PERIOD:
			case SatisfactoryHeaderParser.PIPE:
			case SatisfactoryHeaderParser.PLUS:
			case SatisfactoryHeaderParser.QUESTION:
			case SatisfactoryHeaderParser.SEMICOLON:
			case SatisfactoryHeaderParser.SLASH:
			case SatisfactoryHeaderParser.STAR:
			case SatisfactoryHeaderParser.TILDE:
			case SatisfactoryHeaderParser.IDENTIFIER:
			case SatisfactoryHeaderParser.STRING_LITERAL:
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
			case SatisfactoryHeaderParser.MultiLineMacro:
			case SatisfactoryHeaderParser.Directive:
			case SatisfactoryHeaderParser.LINE_COMMENT_START:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_START:
			case SatisfactoryHeaderParser.WHITESPACE:
			case SatisfactoryHeaderParser.LINE_COMMENT_END:
			case SatisfactoryHeaderParser.LINE_COMMENT_TEXT:
			case SatisfactoryHeaderParser.LINE_COMMENT_OTHER:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_END:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 614;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 613;
						_la = this._input.LA(1);
						if (_la <= 0 || (_la === SatisfactoryHeaderParser.CLOSE_PAREN || _la === SatisfactoryHeaderParser.OPEN_PAREN)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 616;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 73, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case SatisfactoryHeaderParser.OPEN_PAREN:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 618;
				this.contentWithNestedParens();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedBraces(): ContentWithNestedBracesContext {
		let _localctx: ContentWithNestedBracesContext = new ContentWithNestedBracesContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, SatisfactoryHeaderParser.RULE_contentWithNestedBraces);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 621;
			this.match(SatisfactoryHeaderParser.OPEN_BRACE);
			this.state = 625;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.EXTERN) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.FALSE) | (1 << SatisfactoryHeaderParser.FORCEINLINE) | (1 << SatisfactoryHeaderParser.FRIEND) | (1 << SatisfactoryHeaderParser.INLINE) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.NAMESPACE) | (1 << SatisfactoryHeaderParser.OPERATOR) | (1 << SatisfactoryHeaderParser.OVERRIDE) | (1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.TEMPLATE) | (1 << SatisfactoryHeaderParser.TRUE) | (1 << SatisfactoryHeaderParser.TYPEDEF) | (1 << SatisfactoryHeaderParser.TYPENAME) | (1 << SatisfactoryHeaderParser.USING) | (1 << SatisfactoryHeaderParser.VIRTUAL) | (1 << SatisfactoryHeaderParser.UCLASS) | (1 << SatisfactoryHeaderParser.UENUM) | (1 << SatisfactoryHeaderParser.UFUNCTION) | (1 << SatisfactoryHeaderParser.UINTERFACE) | (1 << SatisfactoryHeaderParser.UMETA) | (1 << SatisfactoryHeaderParser.UPARAM) | (1 << SatisfactoryHeaderParser.UPROPERTY))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (SatisfactoryHeaderParser.USTRUCT - 32)) | (1 << (SatisfactoryHeaderParser.UE_DEPRECATED - 32)) | (1 << (SatisfactoryHeaderParser.STAT - 32)) | (1 << (SatisfactoryHeaderParser.SF_CLASS_TAG - 32)) | (1 << (SatisfactoryHeaderParser.SF_GENERATED_BODY - 32)) | (1 << (SatisfactoryHeaderParser.AMPERSAND - 32)) | (1 << (SatisfactoryHeaderParser.BACKSLASH - 32)) | (1 << (SatisfactoryHeaderParser.BANG - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_ANGLE - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_PAREN - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_SQUARE - 32)) | (1 << (SatisfactoryHeaderParser.COLON - 32)) | (1 << (SatisfactoryHeaderParser.COMMA - 32)) | (1 << (SatisfactoryHeaderParser.EQUALS - 32)) | (1 << (SatisfactoryHeaderParser.MINUS - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_ANGLE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_BRACE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_PAREN - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_SQUARE - 32)) | (1 << (SatisfactoryHeaderParser.PERCENT - 32)) | (1 << (SatisfactoryHeaderParser.PERIOD - 32)) | (1 << (SatisfactoryHeaderParser.PIPE - 32)) | (1 << (SatisfactoryHeaderParser.PLUS - 32)) | (1 << (SatisfactoryHeaderParser.QUESTION - 32)) | (1 << (SatisfactoryHeaderParser.SEMICOLON - 32)) | (1 << (SatisfactoryHeaderParser.SLASH - 32)) | (1 << (SatisfactoryHeaderParser.STAR - 32)) | (1 << (SatisfactoryHeaderParser.TILDE - 32)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 32)) | (1 << (SatisfactoryHeaderParser.STRING_LITERAL - 32)) | (1 << (SatisfactoryHeaderParser.FLOAT_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (SatisfactoryHeaderParser.INTEGER_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.HEX_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.MultiLineMacro - 64)) | (1 << (SatisfactoryHeaderParser.Directive - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.WHITESPACE - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_OTHER - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER - 64)))) !== 0)) {
				{
				{
				this.state = 622;
				this.contentWithNestedBracesInner();
				}
				}
				this.state = 627;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 628;
			this.match(SatisfactoryHeaderParser.CLOSE_BRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedBracesInner(): ContentWithNestedBracesInnerContext {
		let _localctx: ContentWithNestedBracesInnerContext = new ContentWithNestedBracesInnerContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, SatisfactoryHeaderParser.RULE_contentWithNestedBracesInner);
		let _la: number;
		try {
			let _alt: number;
			this.state = 636;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.CLASS:
			case SatisfactoryHeaderParser.EXTERN:
			case SatisfactoryHeaderParser.CONST:
			case SatisfactoryHeaderParser.CONSTEXPR:
			case SatisfactoryHeaderParser.ENUM:
			case SatisfactoryHeaderParser.FALSE:
			case SatisfactoryHeaderParser.FORCEINLINE:
			case SatisfactoryHeaderParser.FRIEND:
			case SatisfactoryHeaderParser.INLINE:
			case SatisfactoryHeaderParser.MUTABLE:
			case SatisfactoryHeaderParser.NAMESPACE:
			case SatisfactoryHeaderParser.OPERATOR:
			case SatisfactoryHeaderParser.OVERRIDE:
			case SatisfactoryHeaderParser.PRIVATE:
			case SatisfactoryHeaderParser.PROTECTED:
			case SatisfactoryHeaderParser.PUBLIC:
			case SatisfactoryHeaderParser.STATIC:
			case SatisfactoryHeaderParser.STRUCT:
			case SatisfactoryHeaderParser.TEMPLATE:
			case SatisfactoryHeaderParser.TRUE:
			case SatisfactoryHeaderParser.TYPEDEF:
			case SatisfactoryHeaderParser.TYPENAME:
			case SatisfactoryHeaderParser.USING:
			case SatisfactoryHeaderParser.VIRTUAL:
			case SatisfactoryHeaderParser.UCLASS:
			case SatisfactoryHeaderParser.UENUM:
			case SatisfactoryHeaderParser.UFUNCTION:
			case SatisfactoryHeaderParser.UINTERFACE:
			case SatisfactoryHeaderParser.UMETA:
			case SatisfactoryHeaderParser.UPARAM:
			case SatisfactoryHeaderParser.UPROPERTY:
			case SatisfactoryHeaderParser.USTRUCT:
			case SatisfactoryHeaderParser.UE_DEPRECATED:
			case SatisfactoryHeaderParser.STAT:
			case SatisfactoryHeaderParser.SF_CLASS_TAG:
			case SatisfactoryHeaderParser.SF_GENERATED_BODY:
			case SatisfactoryHeaderParser.AMPERSAND:
			case SatisfactoryHeaderParser.BACKSLASH:
			case SatisfactoryHeaderParser.BANG:
			case SatisfactoryHeaderParser.CLOSE_ANGLE:
			case SatisfactoryHeaderParser.CLOSE_PAREN:
			case SatisfactoryHeaderParser.CLOSE_SQUARE:
			case SatisfactoryHeaderParser.COLON:
			case SatisfactoryHeaderParser.COMMA:
			case SatisfactoryHeaderParser.EQUALS:
			case SatisfactoryHeaderParser.MINUS:
			case SatisfactoryHeaderParser.OPEN_ANGLE:
			case SatisfactoryHeaderParser.OPEN_PAREN:
			case SatisfactoryHeaderParser.OPEN_SQUARE:
			case SatisfactoryHeaderParser.PERCENT:
			case SatisfactoryHeaderParser.PERIOD:
			case SatisfactoryHeaderParser.PIPE:
			case SatisfactoryHeaderParser.PLUS:
			case SatisfactoryHeaderParser.QUESTION:
			case SatisfactoryHeaderParser.SEMICOLON:
			case SatisfactoryHeaderParser.SLASH:
			case SatisfactoryHeaderParser.STAR:
			case SatisfactoryHeaderParser.TILDE:
			case SatisfactoryHeaderParser.IDENTIFIER:
			case SatisfactoryHeaderParser.STRING_LITERAL:
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
			case SatisfactoryHeaderParser.MultiLineMacro:
			case SatisfactoryHeaderParser.Directive:
			case SatisfactoryHeaderParser.LINE_COMMENT_START:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_START:
			case SatisfactoryHeaderParser.WHITESPACE:
			case SatisfactoryHeaderParser.LINE_COMMENT_END:
			case SatisfactoryHeaderParser.LINE_COMMENT_TEXT:
			case SatisfactoryHeaderParser.LINE_COMMENT_OTHER:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_END:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 631;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 630;
						_la = this._input.LA(1);
						if (_la <= 0 || (_la === SatisfactoryHeaderParser.CLOSE_BRACE || _la === SatisfactoryHeaderParser.OPEN_BRACE)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 633;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 76, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case SatisfactoryHeaderParser.OPEN_BRACE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 635;
				this.contentWithNestedBraces();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedAngles(): ContentWithNestedAnglesContext {
		let _localctx: ContentWithNestedAnglesContext = new ContentWithNestedAnglesContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, SatisfactoryHeaderParser.RULE_contentWithNestedAngles);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 638;
			this.match(SatisfactoryHeaderParser.OPEN_ANGLE);
			this.state = 642;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.EXTERN) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.FALSE) | (1 << SatisfactoryHeaderParser.FORCEINLINE) | (1 << SatisfactoryHeaderParser.FRIEND) | (1 << SatisfactoryHeaderParser.INLINE) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.NAMESPACE) | (1 << SatisfactoryHeaderParser.OPERATOR) | (1 << SatisfactoryHeaderParser.OVERRIDE) | (1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.TEMPLATE) | (1 << SatisfactoryHeaderParser.TRUE) | (1 << SatisfactoryHeaderParser.TYPEDEF) | (1 << SatisfactoryHeaderParser.TYPENAME) | (1 << SatisfactoryHeaderParser.USING) | (1 << SatisfactoryHeaderParser.VIRTUAL) | (1 << SatisfactoryHeaderParser.UCLASS) | (1 << SatisfactoryHeaderParser.UENUM) | (1 << SatisfactoryHeaderParser.UFUNCTION) | (1 << SatisfactoryHeaderParser.UINTERFACE) | (1 << SatisfactoryHeaderParser.UMETA) | (1 << SatisfactoryHeaderParser.UPARAM) | (1 << SatisfactoryHeaderParser.UPROPERTY))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (SatisfactoryHeaderParser.USTRUCT - 32)) | (1 << (SatisfactoryHeaderParser.UE_DEPRECATED - 32)) | (1 << (SatisfactoryHeaderParser.STAT - 32)) | (1 << (SatisfactoryHeaderParser.SF_CLASS_TAG - 32)) | (1 << (SatisfactoryHeaderParser.SF_GENERATED_BODY - 32)) | (1 << (SatisfactoryHeaderParser.AMPERSAND - 32)) | (1 << (SatisfactoryHeaderParser.BACKSLASH - 32)) | (1 << (SatisfactoryHeaderParser.BANG - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_BRACE - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_PAREN - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_SQUARE - 32)) | (1 << (SatisfactoryHeaderParser.COLON - 32)) | (1 << (SatisfactoryHeaderParser.COMMA - 32)) | (1 << (SatisfactoryHeaderParser.EQUALS - 32)) | (1 << (SatisfactoryHeaderParser.MINUS - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_ANGLE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_BRACE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_PAREN - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_SQUARE - 32)) | (1 << (SatisfactoryHeaderParser.PERCENT - 32)) | (1 << (SatisfactoryHeaderParser.PERIOD - 32)) | (1 << (SatisfactoryHeaderParser.PIPE - 32)) | (1 << (SatisfactoryHeaderParser.PLUS - 32)) | (1 << (SatisfactoryHeaderParser.QUESTION - 32)) | (1 << (SatisfactoryHeaderParser.SEMICOLON - 32)) | (1 << (SatisfactoryHeaderParser.SLASH - 32)) | (1 << (SatisfactoryHeaderParser.STAR - 32)) | (1 << (SatisfactoryHeaderParser.TILDE - 32)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 32)) | (1 << (SatisfactoryHeaderParser.STRING_LITERAL - 32)) | (1 << (SatisfactoryHeaderParser.FLOAT_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (SatisfactoryHeaderParser.INTEGER_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.HEX_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.MultiLineMacro - 64)) | (1 << (SatisfactoryHeaderParser.Directive - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.WHITESPACE - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_OTHER - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER - 64)))) !== 0)) {
				{
				{
				this.state = 639;
				this.contentWithNestedAnglesInner();
				}
				}
				this.state = 644;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 645;
			this.match(SatisfactoryHeaderParser.CLOSE_ANGLE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedAnglesInner(): ContentWithNestedAnglesInnerContext {
		let _localctx: ContentWithNestedAnglesInnerContext = new ContentWithNestedAnglesInnerContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, SatisfactoryHeaderParser.RULE_contentWithNestedAnglesInner);
		let _la: number;
		try {
			let _alt: number;
			this.state = 653;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.CLASS:
			case SatisfactoryHeaderParser.EXTERN:
			case SatisfactoryHeaderParser.CONST:
			case SatisfactoryHeaderParser.CONSTEXPR:
			case SatisfactoryHeaderParser.ENUM:
			case SatisfactoryHeaderParser.FALSE:
			case SatisfactoryHeaderParser.FORCEINLINE:
			case SatisfactoryHeaderParser.FRIEND:
			case SatisfactoryHeaderParser.INLINE:
			case SatisfactoryHeaderParser.MUTABLE:
			case SatisfactoryHeaderParser.NAMESPACE:
			case SatisfactoryHeaderParser.OPERATOR:
			case SatisfactoryHeaderParser.OVERRIDE:
			case SatisfactoryHeaderParser.PRIVATE:
			case SatisfactoryHeaderParser.PROTECTED:
			case SatisfactoryHeaderParser.PUBLIC:
			case SatisfactoryHeaderParser.STATIC:
			case SatisfactoryHeaderParser.STRUCT:
			case SatisfactoryHeaderParser.TEMPLATE:
			case SatisfactoryHeaderParser.TRUE:
			case SatisfactoryHeaderParser.TYPEDEF:
			case SatisfactoryHeaderParser.TYPENAME:
			case SatisfactoryHeaderParser.USING:
			case SatisfactoryHeaderParser.VIRTUAL:
			case SatisfactoryHeaderParser.UCLASS:
			case SatisfactoryHeaderParser.UENUM:
			case SatisfactoryHeaderParser.UFUNCTION:
			case SatisfactoryHeaderParser.UINTERFACE:
			case SatisfactoryHeaderParser.UMETA:
			case SatisfactoryHeaderParser.UPARAM:
			case SatisfactoryHeaderParser.UPROPERTY:
			case SatisfactoryHeaderParser.USTRUCT:
			case SatisfactoryHeaderParser.UE_DEPRECATED:
			case SatisfactoryHeaderParser.STAT:
			case SatisfactoryHeaderParser.SF_CLASS_TAG:
			case SatisfactoryHeaderParser.SF_GENERATED_BODY:
			case SatisfactoryHeaderParser.AMPERSAND:
			case SatisfactoryHeaderParser.BACKSLASH:
			case SatisfactoryHeaderParser.BANG:
			case SatisfactoryHeaderParser.CLOSE_BRACE:
			case SatisfactoryHeaderParser.CLOSE_PAREN:
			case SatisfactoryHeaderParser.CLOSE_SQUARE:
			case SatisfactoryHeaderParser.COLON:
			case SatisfactoryHeaderParser.COMMA:
			case SatisfactoryHeaderParser.EQUALS:
			case SatisfactoryHeaderParser.MINUS:
			case SatisfactoryHeaderParser.OPEN_BRACE:
			case SatisfactoryHeaderParser.OPEN_PAREN:
			case SatisfactoryHeaderParser.OPEN_SQUARE:
			case SatisfactoryHeaderParser.PERCENT:
			case SatisfactoryHeaderParser.PERIOD:
			case SatisfactoryHeaderParser.PIPE:
			case SatisfactoryHeaderParser.PLUS:
			case SatisfactoryHeaderParser.QUESTION:
			case SatisfactoryHeaderParser.SEMICOLON:
			case SatisfactoryHeaderParser.SLASH:
			case SatisfactoryHeaderParser.STAR:
			case SatisfactoryHeaderParser.TILDE:
			case SatisfactoryHeaderParser.IDENTIFIER:
			case SatisfactoryHeaderParser.STRING_LITERAL:
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
			case SatisfactoryHeaderParser.MultiLineMacro:
			case SatisfactoryHeaderParser.Directive:
			case SatisfactoryHeaderParser.LINE_COMMENT_START:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_START:
			case SatisfactoryHeaderParser.WHITESPACE:
			case SatisfactoryHeaderParser.LINE_COMMENT_END:
			case SatisfactoryHeaderParser.LINE_COMMENT_TEXT:
			case SatisfactoryHeaderParser.LINE_COMMENT_OTHER:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_END:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 648;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 647;
						_la = this._input.LA(1);
						if (_la <= 0 || (_la === SatisfactoryHeaderParser.CLOSE_ANGLE || _la === SatisfactoryHeaderParser.OPEN_ANGLE)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 650;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case SatisfactoryHeaderParser.OPEN_ANGLE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 652;
				this.contentWithNestedAngles();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedSquares(): ContentWithNestedSquaresContext {
		let _localctx: ContentWithNestedSquaresContext = new ContentWithNestedSquaresContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, SatisfactoryHeaderParser.RULE_contentWithNestedSquares);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 655;
			this.match(SatisfactoryHeaderParser.OPEN_SQUARE);
			this.state = 659;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << SatisfactoryHeaderParser.CLASS) | (1 << SatisfactoryHeaderParser.EXTERN) | (1 << SatisfactoryHeaderParser.CONST) | (1 << SatisfactoryHeaderParser.CONSTEXPR) | (1 << SatisfactoryHeaderParser.ENUM) | (1 << SatisfactoryHeaderParser.FALSE) | (1 << SatisfactoryHeaderParser.FORCEINLINE) | (1 << SatisfactoryHeaderParser.FRIEND) | (1 << SatisfactoryHeaderParser.INLINE) | (1 << SatisfactoryHeaderParser.MUTABLE) | (1 << SatisfactoryHeaderParser.NAMESPACE) | (1 << SatisfactoryHeaderParser.OPERATOR) | (1 << SatisfactoryHeaderParser.OVERRIDE) | (1 << SatisfactoryHeaderParser.PRIVATE) | (1 << SatisfactoryHeaderParser.PROTECTED) | (1 << SatisfactoryHeaderParser.PUBLIC) | (1 << SatisfactoryHeaderParser.STATIC) | (1 << SatisfactoryHeaderParser.STRUCT) | (1 << SatisfactoryHeaderParser.TEMPLATE) | (1 << SatisfactoryHeaderParser.TRUE) | (1 << SatisfactoryHeaderParser.TYPEDEF) | (1 << SatisfactoryHeaderParser.TYPENAME) | (1 << SatisfactoryHeaderParser.USING) | (1 << SatisfactoryHeaderParser.VIRTUAL) | (1 << SatisfactoryHeaderParser.UCLASS) | (1 << SatisfactoryHeaderParser.UENUM) | (1 << SatisfactoryHeaderParser.UFUNCTION) | (1 << SatisfactoryHeaderParser.UINTERFACE) | (1 << SatisfactoryHeaderParser.UMETA) | (1 << SatisfactoryHeaderParser.UPARAM) | (1 << SatisfactoryHeaderParser.UPROPERTY))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (SatisfactoryHeaderParser.USTRUCT - 32)) | (1 << (SatisfactoryHeaderParser.UE_DEPRECATED - 32)) | (1 << (SatisfactoryHeaderParser.STAT - 32)) | (1 << (SatisfactoryHeaderParser.SF_CLASS_TAG - 32)) | (1 << (SatisfactoryHeaderParser.SF_GENERATED_BODY - 32)) | (1 << (SatisfactoryHeaderParser.AMPERSAND - 32)) | (1 << (SatisfactoryHeaderParser.BACKSLASH - 32)) | (1 << (SatisfactoryHeaderParser.BANG - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_ANGLE - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_BRACE - 32)) | (1 << (SatisfactoryHeaderParser.CLOSE_PAREN - 32)) | (1 << (SatisfactoryHeaderParser.COLON - 32)) | (1 << (SatisfactoryHeaderParser.COMMA - 32)) | (1 << (SatisfactoryHeaderParser.EQUALS - 32)) | (1 << (SatisfactoryHeaderParser.MINUS - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_ANGLE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_BRACE - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_PAREN - 32)) | (1 << (SatisfactoryHeaderParser.OPEN_SQUARE - 32)) | (1 << (SatisfactoryHeaderParser.PERCENT - 32)) | (1 << (SatisfactoryHeaderParser.PERIOD - 32)) | (1 << (SatisfactoryHeaderParser.PIPE - 32)) | (1 << (SatisfactoryHeaderParser.PLUS - 32)) | (1 << (SatisfactoryHeaderParser.QUESTION - 32)) | (1 << (SatisfactoryHeaderParser.SEMICOLON - 32)) | (1 << (SatisfactoryHeaderParser.SLASH - 32)) | (1 << (SatisfactoryHeaderParser.STAR - 32)) | (1 << (SatisfactoryHeaderParser.TILDE - 32)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 32)) | (1 << (SatisfactoryHeaderParser.STRING_LITERAL - 32)) | (1 << (SatisfactoryHeaderParser.FLOAT_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (SatisfactoryHeaderParser.INTEGER_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.HEX_LITERAL - 64)) | (1 << (SatisfactoryHeaderParser.MultiLineMacro - 64)) | (1 << (SatisfactoryHeaderParser.Directive - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_START - 64)) | (1 << (SatisfactoryHeaderParser.WHITESPACE - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.LINE_COMMENT_OTHER - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_END - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT - 64)) | (1 << (SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER - 64)))) !== 0)) {
				{
				{
				this.state = 656;
				this.contentWithNestedSquaresInner();
				}
				}
				this.state = 661;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 662;
			this.match(SatisfactoryHeaderParser.CLOSE_SQUARE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public contentWithNestedSquaresInner(): ContentWithNestedSquaresInnerContext {
		let _localctx: ContentWithNestedSquaresInnerContext = new ContentWithNestedSquaresInnerContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, SatisfactoryHeaderParser.RULE_contentWithNestedSquaresInner);
		let _la: number;
		try {
			let _alt: number;
			this.state = 670;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.CLASS:
			case SatisfactoryHeaderParser.EXTERN:
			case SatisfactoryHeaderParser.CONST:
			case SatisfactoryHeaderParser.CONSTEXPR:
			case SatisfactoryHeaderParser.ENUM:
			case SatisfactoryHeaderParser.FALSE:
			case SatisfactoryHeaderParser.FORCEINLINE:
			case SatisfactoryHeaderParser.FRIEND:
			case SatisfactoryHeaderParser.INLINE:
			case SatisfactoryHeaderParser.MUTABLE:
			case SatisfactoryHeaderParser.NAMESPACE:
			case SatisfactoryHeaderParser.OPERATOR:
			case SatisfactoryHeaderParser.OVERRIDE:
			case SatisfactoryHeaderParser.PRIVATE:
			case SatisfactoryHeaderParser.PROTECTED:
			case SatisfactoryHeaderParser.PUBLIC:
			case SatisfactoryHeaderParser.STATIC:
			case SatisfactoryHeaderParser.STRUCT:
			case SatisfactoryHeaderParser.TEMPLATE:
			case SatisfactoryHeaderParser.TRUE:
			case SatisfactoryHeaderParser.TYPEDEF:
			case SatisfactoryHeaderParser.TYPENAME:
			case SatisfactoryHeaderParser.USING:
			case SatisfactoryHeaderParser.VIRTUAL:
			case SatisfactoryHeaderParser.UCLASS:
			case SatisfactoryHeaderParser.UENUM:
			case SatisfactoryHeaderParser.UFUNCTION:
			case SatisfactoryHeaderParser.UINTERFACE:
			case SatisfactoryHeaderParser.UMETA:
			case SatisfactoryHeaderParser.UPARAM:
			case SatisfactoryHeaderParser.UPROPERTY:
			case SatisfactoryHeaderParser.USTRUCT:
			case SatisfactoryHeaderParser.UE_DEPRECATED:
			case SatisfactoryHeaderParser.STAT:
			case SatisfactoryHeaderParser.SF_CLASS_TAG:
			case SatisfactoryHeaderParser.SF_GENERATED_BODY:
			case SatisfactoryHeaderParser.AMPERSAND:
			case SatisfactoryHeaderParser.BACKSLASH:
			case SatisfactoryHeaderParser.BANG:
			case SatisfactoryHeaderParser.CLOSE_ANGLE:
			case SatisfactoryHeaderParser.CLOSE_BRACE:
			case SatisfactoryHeaderParser.CLOSE_PAREN:
			case SatisfactoryHeaderParser.COLON:
			case SatisfactoryHeaderParser.COMMA:
			case SatisfactoryHeaderParser.EQUALS:
			case SatisfactoryHeaderParser.MINUS:
			case SatisfactoryHeaderParser.OPEN_ANGLE:
			case SatisfactoryHeaderParser.OPEN_BRACE:
			case SatisfactoryHeaderParser.OPEN_PAREN:
			case SatisfactoryHeaderParser.PERCENT:
			case SatisfactoryHeaderParser.PERIOD:
			case SatisfactoryHeaderParser.PIPE:
			case SatisfactoryHeaderParser.PLUS:
			case SatisfactoryHeaderParser.QUESTION:
			case SatisfactoryHeaderParser.SEMICOLON:
			case SatisfactoryHeaderParser.SLASH:
			case SatisfactoryHeaderParser.STAR:
			case SatisfactoryHeaderParser.TILDE:
			case SatisfactoryHeaderParser.IDENTIFIER:
			case SatisfactoryHeaderParser.STRING_LITERAL:
			case SatisfactoryHeaderParser.FLOAT_LITERAL:
			case SatisfactoryHeaderParser.INTEGER_LITERAL:
			case SatisfactoryHeaderParser.HEX_LITERAL:
			case SatisfactoryHeaderParser.MultiLineMacro:
			case SatisfactoryHeaderParser.Directive:
			case SatisfactoryHeaderParser.LINE_COMMENT_START:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_START:
			case SatisfactoryHeaderParser.WHITESPACE:
			case SatisfactoryHeaderParser.LINE_COMMENT_END:
			case SatisfactoryHeaderParser.LINE_COMMENT_TEXT:
			case SatisfactoryHeaderParser.LINE_COMMENT_OTHER:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_END:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_NEW_LINE:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_TEXT:
			case SatisfactoryHeaderParser.BLOCK_COMMENT_OTHER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 665;
				this._errHandler.sync(this);
				_alt = 1;
				do {
					switch (_alt) {
					case 1:
						{
						{
						this.state = 664;
						_la = this._input.LA(1);
						if (_la <= 0 || (_la === SatisfactoryHeaderParser.CLOSE_SQUARE || _la === SatisfactoryHeaderParser.OPEN_SQUARE)) {
						this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					this.state = 667;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 82, this._ctx);
				} while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER);
				}
				break;
			case SatisfactoryHeaderParser.OPEN_SQUARE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 669;
				this.contentWithNestedSquares();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionName(): FunctionNameContext {
		let _localctx: FunctionNameContext = new FunctionNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, SatisfactoryHeaderParser.RULE_functionName);
		let _la: number;
		try {
			this.state = 707;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 85, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 673;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SatisfactoryHeaderParser.TILDE) {
					{
					this.state = 672;
					this.match(SatisfactoryHeaderParser.TILDE);
					}
				}

				this.state = 675;
				this.identifier();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 676;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 677;
				this.match(SatisfactoryHeaderParser.EQUALS);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 678;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 679;
				this.match(SatisfactoryHeaderParser.EQUALS);
				this.state = 680;
				this.match(SatisfactoryHeaderParser.EQUALS);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 681;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 682;
				this.match(SatisfactoryHeaderParser.BANG);
				this.state = 683;
				this.match(SatisfactoryHeaderParser.EQUALS);
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 684;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 685;
				this.match(SatisfactoryHeaderParser.PLUS);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 686;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 687;
				this.match(SatisfactoryHeaderParser.MINUS);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 688;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 689;
				this.match(SatisfactoryHeaderParser.OPEN_SQUARE);
				this.state = 690;
				this.match(SatisfactoryHeaderParser.CLOSE_SQUARE);
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 691;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 692;
				this.match(SatisfactoryHeaderParser.OPEN_ANGLE);
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 693;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 694;
				this.match(SatisfactoryHeaderParser.OPEN_ANGLE);
				this.state = 695;
				this.match(SatisfactoryHeaderParser.OPEN_ANGLE);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 696;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 697;
				this.match(SatisfactoryHeaderParser.CLOSE_ANGLE);
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 698;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 699;
				this.match(SatisfactoryHeaderParser.CLOSE_ANGLE);
				this.state = 700;
				this.match(SatisfactoryHeaderParser.CLOSE_ANGLE);
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 701;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 702;
				this.match(SatisfactoryHeaderParser.OPEN_PAREN);
				this.state = 703;
				this.match(SatisfactoryHeaderParser.CLOSE_PAREN);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 704;
				this.match(SatisfactoryHeaderParser.OPERATOR);
				this.state = 705;
				this.match(SatisfactoryHeaderParser.MINUS);
				this.state = 706;
				this.match(SatisfactoryHeaderParser.CLOSE_ANGLE);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionModifier(): FunctionModifierContext {
		let _localctx: FunctionModifierContext = new FunctionModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, SatisfactoryHeaderParser.RULE_functionModifier);
		try {
			this.state = 718;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case SatisfactoryHeaderParser.STATIC:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 709;
				this.match(SatisfactoryHeaderParser.STATIC);
				}
				break;
			case SatisfactoryHeaderParser.CONST:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 710;
				this.match(SatisfactoryHeaderParser.CONST);
				}
				break;
			case SatisfactoryHeaderParser.CONSTEXPR:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 711;
				this.match(SatisfactoryHeaderParser.CONSTEXPR);
				}
				break;
			case SatisfactoryHeaderParser.VIRTUAL:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 712;
				this.match(SatisfactoryHeaderParser.VIRTUAL);
				}
				break;
			case SatisfactoryHeaderParser.FORCEINLINE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 713;
				this.match(SatisfactoryHeaderParser.FORCEINLINE);
				}
				break;
			case SatisfactoryHeaderParser.INLINE:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 714;
				this.match(SatisfactoryHeaderParser.INLINE);
				}
				break;
			case SatisfactoryHeaderParser.FRIEND:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 715;
				this.match(SatisfactoryHeaderParser.FRIEND);
				}
				break;
			case SatisfactoryHeaderParser.TEMPLATE:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 716;
				this.match(SatisfactoryHeaderParser.TEMPLATE);
				this.state = 717;
				this.contentWithNestedAngles();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public namespaceDeclaration(): NamespaceDeclarationContext {
		let _localctx: NamespaceDeclarationContext = new NamespaceDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, SatisfactoryHeaderParser.RULE_namespaceDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 720;
			this.match(SatisfactoryHeaderParser.NAMESPACE);
			this.state = 721;
			this.identifier();
			this.state = 722;
			this.contentWithNestedBraces();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public usingNamespace(): UsingNamespaceContext {
		let _localctx: UsingNamespaceContext = new UsingNamespaceContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, SatisfactoryHeaderParser.RULE_usingNamespace);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 724;
			this.match(SatisfactoryHeaderParser.USING);
			this.state = 725;
			this.identifier();
			this.state = 726;
			this.match(SatisfactoryHeaderParser.EQUALS);
			this.state = 727;
			this.identifier();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uclassMacro(): UclassMacroContext {
		let _localctx: UclassMacroContext = new UclassMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, SatisfactoryHeaderParser.RULE_uclassMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 729;
			this.match(SatisfactoryHeaderParser.UCLASS);
			this.state = 730;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uenumMacro(): UenumMacroContext {
		let _localctx: UenumMacroContext = new UenumMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, SatisfactoryHeaderParser.RULE_uenumMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 732;
			this.match(SatisfactoryHeaderParser.UENUM);
			this.state = 733;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ufunctionMacro(): UfunctionMacroContext {
		let _localctx: UfunctionMacroContext = new UfunctionMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, SatisfactoryHeaderParser.RULE_ufunctionMacro);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 736;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.FORCEINLINE) {
				{
				this.state = 735;
				this.match(SatisfactoryHeaderParser.FORCEINLINE);
				}
			}

			this.state = 738;
			this.match(SatisfactoryHeaderParser.UFUNCTION);
			this.state = 739;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uinterfaceMacro(): UinterfaceMacroContext {
		let _localctx: UinterfaceMacroContext = new UinterfaceMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, SatisfactoryHeaderParser.RULE_uinterfaceMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 741;
			this.match(SatisfactoryHeaderParser.UINTERFACE);
			this.state = 742;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public umetaMacro(): UmetaMacroContext {
		let _localctx: UmetaMacroContext = new UmetaMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, SatisfactoryHeaderParser.RULE_umetaMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 744;
			this.match(SatisfactoryHeaderParser.UMETA);
			this.state = 745;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uParamMacro(): UParamMacroContext {
		let _localctx: UParamMacroContext = new UParamMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, SatisfactoryHeaderParser.RULE_uParamMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 747;
			this.match(SatisfactoryHeaderParser.UPARAM);
			this.state = 748;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public upropertyMacro(): UpropertyMacroContext {
		let _localctx: UpropertyMacroContext = new UpropertyMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, SatisfactoryHeaderParser.RULE_upropertyMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 750;
			this.match(SatisfactoryHeaderParser.UPROPERTY);
			this.state = 751;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public ustructMacro(): UstructMacroContext {
		let _localctx: UstructMacroContext = new UstructMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, SatisfactoryHeaderParser.RULE_ustructMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 753;
			this.match(SatisfactoryHeaderParser.USTRUCT);
			this.state = 754;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public uedeprecatedMacro(): UedeprecatedMacroContext {
		let _localctx: UedeprecatedMacroContext = new UedeprecatedMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, SatisfactoryHeaderParser.RULE_uedeprecatedMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 756;
			this.match(SatisfactoryHeaderParser.UE_DEPRECATED);
			this.state = 757;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public generatedBodyMacro(): GeneratedBodyMacroContext {
		let _localctx: GeneratedBodyMacroContext = new GeneratedBodyMacroContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, SatisfactoryHeaderParser.RULE_generatedBodyMacro);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 759;
			this.match(SatisfactoryHeaderParser.SF_GENERATED_BODY);
			this.state = 760;
			this.macroPropertyList();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public macroPropertyList(): MacroPropertyListContext {
		let _localctx: MacroPropertyListContext = new MacroPropertyListContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, SatisfactoryHeaderParser.RULE_macroPropertyList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 762;
			this.match(SatisfactoryHeaderParser.OPEN_PAREN);
			this.state = 764;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === SatisfactoryHeaderParser.FALSE || _la === SatisfactoryHeaderParser.TRUE || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (SatisfactoryHeaderParser.OPEN_PAREN - 50)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 50)) | (1 << (SatisfactoryHeaderParser.STRING_LITERAL - 50)) | (1 << (SatisfactoryHeaderParser.FLOAT_LITERAL - 50)) | (1 << (SatisfactoryHeaderParser.INTEGER_LITERAL - 50)) | (1 << (SatisfactoryHeaderParser.HEX_LITERAL - 50)))) !== 0)) {
				{
				this.state = 763;
				this.macroPropertyListEntries();
				}
			}

			this.state = 766;
			this.match(SatisfactoryHeaderParser.CLOSE_PAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public macroPropertyListEntries(): MacroPropertyListEntriesContext {
		let _localctx: MacroPropertyListEntriesContext = new MacroPropertyListEntriesContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, SatisfactoryHeaderParser.RULE_macroPropertyListEntries);
		let _la: number;
		try {
			this.state = 774;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 90, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 768;
				this.macroProperty();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 769;
				this.macroProperty();
				this.state = 770;
				this.match(SatisfactoryHeaderParser.COMMA);
				this.state = 772;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === SatisfactoryHeaderParser.FALSE || _la === SatisfactoryHeaderParser.TRUE || ((((_la - 50)) & ~0x1F) === 0 && ((1 << (_la - 50)) & ((1 << (SatisfactoryHeaderParser.OPEN_PAREN - 50)) | (1 << (SatisfactoryHeaderParser.IDENTIFIER - 50)) | (1 << (SatisfactoryHeaderParser.STRING_LITERAL - 50)) | (1 << (SatisfactoryHeaderParser.FLOAT_LITERAL - 50)) | (1 << (SatisfactoryHeaderParser.INTEGER_LITERAL - 50)) | (1 << (SatisfactoryHeaderParser.HEX_LITERAL - 50)))) !== 0)) {
					{
					this.state = 771;
					this.macroPropertyListEntries();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public macroProperty(): MacroPropertyContext {
		let _localctx: MacroPropertyContext = new MacroPropertyContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, SatisfactoryHeaderParser.RULE_macroProperty);
		try {
			this.state = 780;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 91, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 776;
				this.identifier();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 777;
				this.literal();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 778;
				this.macroPropertyPair();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 779;
				this.macroPropertyList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public macroPropertyPair(): MacroPropertyPairContext {
		let _localctx: MacroPropertyPairContext = new MacroPropertyPairContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, SatisfactoryHeaderParser.RULE_macroPropertyPair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 782;
			this.identifier();
			this.state = 783;
			this.match(SatisfactoryHeaderParser.EQUALS);
			this.state = 784;
			this.macroProperty();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 35:
			return this.literalExpression_sempred(_localctx as LiteralExpressionContext, predIndex);
		}
		return true;
	}
	private literalExpression_sempred(_localctx: LiteralExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 4);

		case 1:
			return this.precpred(this._ctx, 3);

		case 2:
			return this.precpred(this._ctx, 2);

		case 3:
			return this.precpred(this._ctx, 1);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 2;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03O\u0315\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x03\x02\x07\x02\xA4\n\x02\f\x02\x0E\x02\xA7\v\x02" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03\x03" +
		"\x03\x03\x03\x03\x03\x03\x03\x03\x05\x03\xB6\n\x03\x03\x04\x03\x04\x05" +
		"\x04\xBA\n\x04\x03\x05\x03\x05\x03\x05\x05\x05\xBF\n\x05\x03\x06\x03\x06" +
		"\x03\x06\x03\x06\x03\x06\x05\x06\xC6\n\x06\x03\x07\x03\x07\x03\b\x03\b" +
		"\x03\t\x03\t\x03\n\x07\n\xCF\n\n\f\n\x0E\n\xD2\v\n\x03\n\x03\n\x05\n\xD6" +
		"\n\n\x03\n\x05\n\xD9\n\n\x03\n\x05\n\xDC\n\n\x03\n\x05\n\xDF\n\n\x03\v" +
		"\x03\v\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x03\f\x05\f\xEB\n\f\x03" +
		"\r\x03\r\x03\x0E\x03\x0E\x05\x0E\xF1\n\x0E\x03\x0E\x03\x0E\x05\x0E\xF5" +
		"\n\x0E\x03\x0E\x05\x0E\xF8\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F" +
		"\x03\x0F\x03\x0F\x05\x0F\u0101\n\x0F\x03\x10\x05\x10\u0104\n\x10\x03\x10" +
		"\x05\x10\u0107\n\x10\x03\x10\x03\x10\x05\x10\u010B\n\x10\x03\x10\x03\x10" +
		"\x05\x10\u010F\n\x10\x03\x10\x05\x10\u0112\n\x10\x03\x11\x03\x11\x03\x11" +
		"\x05\x11\u0117\n\x11\x03\x12\x03\x12\x03\x12\x03\x13\x03\x13\x03\x14\x03" +
		"\x14\x03\x14\x03\x15\x03\x15\x03\x15\x03\x15\x03\x15\x05\x15\u0126\n\x15" +
		"\x03\x16\x05\x16\u0129\n\x16\x03\x16\x03\x16\x05\x16\u012D\n\x16\x03\x17" +
		"\x05\x17\u0130\n\x17\x03\x18\x03\x18\x05\x18\u0134\n\x18\x03\x19\x03\x19" +
		"\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19\x03\x19" +
		"\x03\x19\x05\x19\u0142\n\x19\x03\x1A\x03\x1A\x03\x1A\x03\x1B\x03\x1B\x03" +
		"\x1C\x03\x1C\x05\x1C\u014B\n\x1C\x03\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D" +
		"\x03\x1D\x03\x1E\x05\x1E\u0154\n\x1E\x03\x1E\x05\x1E\u0157\n\x1E\x03\x1E" +
		"\x07\x1E\u015A\n\x1E\f\x1E\x0E\x1E\u015D\v\x1E\x03\x1E\x05\x1E\u0160\n" +
		"\x1E\x03\x1E\x03\x1E\x03\x1E\x07\x1E\u0165\n\x1E\f\x1E\x0E\x1E\u0168\v" +
		"\x1E\x03\x1E\x03\x1E\x03\x1F\x05\x1F\u016D\n\x1F\x03\x1F\x03\x1F\x05\x1F" +
		"\u0171\n\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u0177\n\x1F\x03\x1F" +
		"\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u017D\n\x1F\x03 \x03 \x03!\x03!\x03!" +
		"\x03!\x03!\x05!\u0186\n!\x03\"\x03\"\x03\"\x03#\x05#\u018C\n#\x03#\x05" +
		"#\u018F\n#\x03#\x03#\x05#\u0193\n#\x03#\x05#\u0196\n#\x03#\x03#\x03$\x03" +
		"$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x03$\x05$\u01A6\n$\x03" +
		"%\x03%\x03%\x05%\u01AB\n%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03%\x03" +
		"%\x03%\x03%\x03%\x07%\u01B9\n%\f%\x0E%\u01BC\v%\x03&\x03&\x05&\u01C0\n" +
		"&\x03\'\x03\'\x05\'\u01C4\n\'\x03\'\x03\'\x03(\x03(\x03(\x03)\x03)\x03" +
		")\x03)\x05)\u01CF\n)\x03)\x03)\x03*\x03*\x03*\x05*\u01D6\n*\x03*\x03*" +
		"\x03+\x03+\x03+\x05+\u01DD\n+\x03+\x03+\x03,\x03,\x03,\x03,\x05,\u01E5" +
		"\n,\x03,\x03,\x05,\u01E9\n,\x03-\x03-\x03-\x03-\x05-\u01EF\n-\x03-\x03" +
		"-\x05-\u01F3\n-\x03.\x05.\u01F6\n.\x03.\x03.\x05.\u01FA\n.\x03.\x03.\x05" +
		".\u01FE\n.\x03.\x03.\x05.\u0202\n.\x03.\x03.\x03.\x03.\x05.\u0208\n.\x03" +
		"/\x03/\x03/\x03/\x03/\x05/\u020F\n/\x030\x030\x050\u0213\n0\x030\x050" +
		"\u0216\n0\x031\x031\x031\x032\x072\u021C\n2\f2\x0E2\u021F\v2\x032\x05" +
		"2\u0222\n2\x032\x032\x032\x052\u0227\n2\x032\x052\u022A\n2\x032\x052\u022D" +
		"\n2\x033\x073\u0230\n3\f3\x0E3\u0233\v3\x033\x053\u0236\n3\x033\x033\x03" +
		"3\x033\x033\x034\x034\x034\x034\x034\x034\x034\x035\x035\x035\x035\x03" +
		"5\x036\x036\x036\x036\x037\x037\x057\u024F\n7\x037\x037\x037\x037\x03" +
		"7\x037\x037\x037\x037\x037\x037\x037\x057\u025D\n7\x038\x038\x078\u0261" +
		"\n8\f8\x0E8\u0264\v8\x038\x038\x039\x069\u0269\n9\r9\x0E9\u026A\x039\x05" +
		"9\u026E\n9\x03:\x03:\x07:\u0272\n:\f:\x0E:\u0275\v:\x03:\x03:\x03;\x06" +
		";\u027A\n;\r;\x0E;\u027B\x03;\x05;\u027F\n;\x03<\x03<\x07<\u0283\n<\f" +
		"<\x0E<\u0286\v<\x03<\x03<\x03=\x06=\u028B\n=\r=\x0E=\u028C\x03=\x05=\u0290" +
		"\n=\x03>\x03>\x07>\u0294\n>\f>\x0E>\u0297\v>\x03>\x03>\x03?\x06?\u029C" +
		"\n?\r?\x0E?\u029D\x03?\x05?\u02A1\n?\x03@\x05@\u02A4\n@\x03@\x03@\x03" +
		"@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03" +
		"@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03@\x03" +
		"@\x03@\x05@\u02C6\n@\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x03A\x05" +
		"A\u02D1\nA\x03B\x03B\x03B\x03B\x03C\x03C\x03C\x03C\x03C\x03D\x03D\x03" +
		"D\x03E\x03E\x03E\x03F\x05F\u02E3\nF\x03F\x03F\x03F\x03G\x03G\x03G\x03" +
		"H\x03H\x03H\x03I\x03I\x03I\x03J\x03J\x03J\x03K\x03K\x03K\x03L\x03L\x03" +
		"L\x03M\x03M\x03M\x03N\x03N\x05N\u02FF\nN\x03N\x03N\x03O\x03O\x03O\x03" +
		"O\x05O\u0307\nO\x05O\u0309\nO\x03P\x03P\x03P\x03P\x05P\u030F\nP\x03Q\x03" +
		"Q\x03Q\x03Q\x03Q\x02\x02\x03HR\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02" +
		"\x0E\x02\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02" +
		" \x02\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02" +
		"<\x02>\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02" +
		"X\x02Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02" +
		"t\x02v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88\x02" +
		"\x8A\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A\x02" +
		"\x9C\x02\x9E\x02\xA0\x02\x02\f\x03\x02AC\x04\x02\b\b\x16\x16\x04\x02\'" +
		"\'==\x04\x02\x03\x03\x14\x14\x03\x02\x10\x12\x04\x02\x05\x05\x0F\x0F\x04" +
		"\x02,,44\x04\x02++33\x04\x02**22\x04\x02--55\x02\u0357\x02\xA5\x03\x02" +
		"\x02\x02\x04\xB5\x03\x02\x02\x02\x06\xB9\x03\x02\x02\x02\b\xBE\x03\x02" +
		"\x02\x02\n\xC5\x03\x02\x02\x02\f\xC7\x03\x02\x02\x02\x0E\xC9\x03\x02\x02" +
		"\x02\x10\xCB\x03\x02\x02\x02\x12\xD0\x03\x02\x02\x02\x14\xE0\x03\x02\x02" +
		"\x02\x16\xEA\x03\x02\x02\x02\x18\xEC\x03\x02\x02\x02\x1A\xEE\x03\x02\x02" +
		"\x02\x1C\xFB\x03\x02\x02\x02\x1E\u0103\x03\x02\x02\x02 \u0116\x03\x02" +
		"\x02\x02\"\u0118\x03\x02\x02\x02$\u011B\x03\x02\x02\x02&\u011D\x03\x02" +
		"\x02\x02(\u0125\x03\x02\x02\x02*\u0128\x03\x02\x02\x02,\u012F\x03\x02" +
		"\x02\x02.\u0131\x03\x02\x02\x020\u0141\x03\x02\x02\x022\u0143\x03\x02" +
		"\x02\x024\u0146\x03\x02\x02\x026\u0148\x03\x02\x02\x028\u014F\x03\x02" +
		"\x02\x02:\u0153\x03\x02\x02\x02<\u017C\x03\x02\x02\x02>\u017E\x03\x02" +
		"\x02\x02@\u0185\x03\x02\x02\x02B\u0187\x03\x02\x02\x02D\u018B\x03\x02" +
		"\x02\x02F\u01A5\x03\x02\x02\x02H\u01AA\x03\x02\x02\x02J\u01BF\x03\x02" +
		"\x02\x02L\u01C1\x03\x02\x02\x02N\u01C7\x03\x02\x02\x02P\u01CA\x03\x02" +
		"\x02\x02R\u01D2\x03\x02\x02\x02T\u01D9\x03\x02\x02\x02V\u01E0\x03\x02" +
		"\x02\x02X\u01EA\x03\x02\x02\x02Z\u0207\x03\x02\x02\x02\\\u020E\x03\x02" +
		"\x02\x02^\u0210\x03\x02\x02\x02`\u0217\x03\x02\x02\x02b\u021D\x03\x02" +
		"\x02\x02d\u0231\x03\x02\x02\x02f\u023C\x03\x02\x02\x02h\u0243\x03\x02" +
		"\x02\x02j\u0248\x03\x02\x02\x02l\u025C\x03\x02\x02\x02n\u025E\x03\x02" +
		"\x02\x02p\u026D\x03\x02\x02\x02r\u026F\x03\x02\x02\x02t\u027E\x03\x02" +
		"\x02\x02v\u0280\x03\x02\x02\x02x\u028F\x03\x02\x02\x02z\u0291\x03\x02" +
		"\x02\x02|\u02A0\x03\x02\x02\x02~\u02C5\x03\x02\x02\x02\x80\u02D0\x03\x02" +
		"\x02\x02\x82\u02D2\x03\x02\x02\x02\x84\u02D6\x03\x02\x02\x02\x86\u02DB" +
		"\x03\x02\x02\x02\x88\u02DE\x03\x02\x02\x02\x8A\u02E2\x03\x02\x02\x02\x8C" +
		"\u02E7\x03\x02\x02\x02\x8E\u02EA\x03\x02\x02\x02\x90\u02ED\x03\x02\x02" +
		"\x02\x92\u02F0\x03\x02\x02\x02\x94\u02F3\x03\x02\x02\x02\x96\u02F6\x03" +
		"\x02\x02\x02\x98\u02F9\x03\x02\x02\x02\x9A\u02FC\x03\x02\x02\x02\x9C\u0308" +
		"\x03\x02\x02\x02\x9E\u030E\x03\x02\x02\x02\xA0\u0310\x03\x02\x02\x02\xA2" +
		"\xA4\x05\x04\x03\x02\xA3\xA2\x03\x02\x02\x02\xA4\xA7\x03\x02\x02\x02\xA5" +
		"\xA3\x03\x02\x02\x02\xA5\xA6\x03\x02\x02\x02\xA6\x03\x03\x02\x02\x02\xA7" +
		"\xA5\x03\x02\x02\x02\xA8\xB6\x05\x1C\x0F\x02\xA9\xB6\x05X-\x02\xAA\xB6" +
		"\x05\x82B\x02\xAB\xB6\x05j6\x02\xAC\xB6\x05b2\x02\xAD\xB6\x05d3\x02\xAE" +
		"\xB6\x05h5\x02\xAF\xB6\x05f4\x02\xB0\xB6\x05l7\x02\xB1\xB6\x05\x84C\x02" +
		"\xB2\xB6\x05\x1A\x0E\x02\xB3\xB6\x05V,\x02\xB4\xB6\x07;\x02\x02\xB5\xA8" +
		"\x03\x02\x02\x02\xB5\xA9\x03\x02\x02\x02\xB5\xAA\x03\x02\x02\x02\xB5\xAB" +
		"\x03\x02\x02\x02\xB5\xAC\x03\x02\x02\x02\xB5\xAD\x03\x02\x02\x02\xB5\xAE" +
		"\x03\x02\x02\x02\xB5\xAF\x03\x02\x02\x02\xB5\xB0\x03\x02\x02\x02\xB5\xB1" +
		"\x03\x02\x02\x02\xB5\xB2\x03\x02\x02\x02\xB5\xB3\x03\x02\x02\x02\xB5\xB4" +
		"\x03\x02\x02\x02\xB6\x05\x03\x02\x02\x02\xB7\xBA\x05\n\x06\x02\xB8\xBA" +
		"\x05\b\x05\x02\xB9\xB7\x03\x02\x02\x02\xB9\xB8\x03\x02\x02\x02\xBA\x07" +
		"\x03\x02\x02\x02\xBB\xBF\x05\f\x07\x02\xBC\xBF\x05\x0E\b\x02\xBD\xBF\x05" +
		"\x10\t\x02\xBE\xBB\x03\x02\x02\x02\xBE\xBC\x03\x02\x02\x02\xBE\xBD\x03" +
		"\x02\x02\x02\xBF\t\x03\x02\x02\x02\xC0\xC6\x07?\x02\x02\xC1\xC2\x07?\x02" +
		"\x02\xC2\xC3\x07.\x02\x02\xC3\xC4\x07.\x02\x02\xC4\xC6\x07?\x02\x02\xC5" +
		"\xC0\x03\x02\x02\x02\xC5\xC1\x03\x02\x02\x02\xC6\v\x03\x02\x02\x02\xC7" +
		"\xC8\x07@\x02\x02\xC8\r\x03\x02\x02\x02\xC9\xCA\t\x02\x02\x02\xCA\x0F" +
		"\x03\x02\x02\x02\xCB\xCC\t\x03\x02\x02\xCC\x11\x03\x02\x02\x02\xCD\xCF" +
		"\x05\x16\f\x02\xCE\xCD\x03\x02\x02\x02\xCF\xD2\x03\x02\x02\x02\xD0\xCE" +
		"\x03\x02\x02\x02\xD0\xD1\x03\x02\x02\x02\xD1\xD3\x03\x02\x02\x02\xD2\xD0" +
		"\x03\x02\x02\x02\xD3\xD5\x05\n\x06\x02\xD4\xD6\x05\x16\f\x02\xD5\xD4\x03" +
		"\x02\x02\x02\xD5\xD6\x03\x02\x02\x02\xD6\xD8\x03\x02\x02\x02\xD7\xD9\x05" +
		"\x14\v\x02\xD8\xD7\x03\x02\x02\x02\xD8\xD9\x03\x02\x02\x02\xD9\xDB\x03" +
		"\x02\x02\x02\xDA\xDC\x05\x18\r\x02\xDB\xDA\x03\x02\x02\x02\xDB\xDC\x03" +
		"\x02\x02\x02\xDC\xDE\x03\x02\x02\x02\xDD\xDF\x07\x06\x02\x02\xDE\xDD\x03" +
		"\x02\x02\x02\xDE\xDF\x03\x02\x02\x02\xDF\x13\x03\x02\x02\x02\xE0\xE1\x05" +
		"v<\x02\xE1\x15\x03\x02\x02\x02\xE2\xEB\x07\x03\x02\x02\xE3\xEB\x07\x05" +
		"\x02\x02\xE4\xEB\x07\x06\x02\x02\xE5\xEB\x07\x07\x02\x02\xE6\xEB\x07\x14" +
		"\x02\x02\xE7\xEB\x07\x13\x02\x02\xE8\xEB\x07\f\x02\x02\xE9\xEB\x05\x90" +
		"I\x02\xEA\xE2\x03\x02\x02\x02\xEA\xE3\x03\x02\x02\x02\xEA\xE4\x03\x02" +
		"\x02\x02\xEA\xE5\x03\x02\x02\x02\xEA\xE6\x03\x02\x02\x02\xEA\xE7\x03\x02" +
		"\x02\x02\xEA\xE8\x03\x02\x02\x02\xEA\xE9\x03\x02\x02\x02\xEB\x17\x03\x02" +
		"\x02\x02\xEC\xED\t\x04\x02\x02\xED\x19\x03\x02\x02\x02\xEE\xF0\x07\x04" +
		"\x02\x02\xEF\xF1\x05\x12\n\x02\xF0\xEF\x03\x02\x02\x02\xF0\xF1\x03\x02" +
		"\x02\x02\xF1\xF2\x03\x02\x02\x02\xF2\xF4\x05\n\x06\x02\xF3\xF5\x05z>\x02" +
		"\xF4\xF3\x03\x02\x02\x02\xF4\xF5\x03\x02\x02\x02\xF5\xF7\x03\x02\x02\x02" +
		"\xF6\xF8\x05F$\x02\xF7\xF6\x03\x02\x02\x02\xF7\xF8\x03\x02\x02\x02\xF8" +
		"\xF9\x03\x02\x02\x02\xF9\xFA\x07;\x02\x02\xFA\x1B\x03\x02\x02\x02\xFB" +
		"\xFC\x05\x1E\x10\x02\xFC\xFD\x073\x02\x02\xFD\xFE\x05,\x17\x02\xFE\u0100" +
		"\x07+\x02\x02\xFF\u0101\x07;\x02\x02\u0100\xFF\x03\x02\x02\x02\u0100\u0101" +
		"\x03\x02\x02\x02\u0101\x1D\x03\x02\x02\x02\u0102\u0104\x05 \x11\x02\u0103" +
		"\u0102\x03\x02\x02\x02\u0103\u0104\x03\x02\x02\x02\u0104\u0106\x03\x02" +
		"\x02\x02\u0105\u0107\x05\"\x12\x02\u0106\u0105\x03\x02\x02\x02\u0106\u0107" +
		"\x03\x02\x02\x02\u0107\u0108\x03\x02\x02\x02\u0108\u010A\x05$\x13\x02" +
		"\u0109\u010B\x07%\x02\x02\u010A\u0109\x03\x02\x02\x02\u010A\u010B\x03" +
		"\x02\x02\x02\u010B\u010C\x03\x02\x02\x02\u010C\u010E\x05\n\x06\x02\u010D" +
		"\u010F\x05v<\x02\u010E\u010D\x03\x02\x02\x02\u010E\u010F\x03\x02\x02\x02" +
		"\u010F\u0111\x03\x02\x02\x02\u0110\u0112\x05&\x14\x02\u0111\u0110\x03" +
		"\x02\x02\x02\u0111\u0112\x03\x02\x02\x02\u0112\x1F\x03\x02\x02\x02\u0113" +
		"\u0117\x05\x86D\x02\u0114\u0117\x05\x8CG\x02\u0115\u0117\x05\x94K\x02" +
		"\u0116\u0113\x03\x02\x02\x02\u0116\u0114\x03\x02\x02\x02\u0116\u0115\x03" +
		"\x02\x02\x02\u0117!\x03\x02\x02\x02\u0118\u0119\x07\x15\x02\x02\u0119" +
		"\u011A\x05v<\x02\u011A#\x03\x02\x02\x02\u011B\u011C\t\x05\x02\x02\u011C" +
		"%\x03\x02\x02\x02\u011D\u011E\x07.\x02\x02\u011E\u011F\x05(\x15\x02\u011F" +
		"\'\x03\x02\x02\x02\u0120\u0126\x05*\x16\x02\u0121\u0122\x05*\x16\x02\u0122" +
		"\u0123\x07/\x02\x02\u0123\u0124\x05(\x15\x02\u0124\u0126\x03\x02\x02\x02" +
		"\u0125\u0120\x03\x02\x02\x02\u0125\u0121\x03\x02\x02\x02\u0126)\x03\x02" +
		"\x02\x02\u0127\u0129\x054\x1B\x02\u0128\u0127\x03\x02\x02\x02\u0128\u0129" +
		"\x03\x02\x02\x02\u0129\u012A\x03\x02\x02\x02\u012A\u012C\x05\n\x06\x02" +
		"\u012B\u012D\x05v<\x02\u012C\u012B\x03\x02\x02\x02\u012C\u012D\x03\x02" +
		"\x02\x02\u012D+\x03\x02\x02\x02\u012E\u0130\x05.\x18\x02\u012F\u012E\x03" +
		"\x02\x02\x02\u012F\u0130\x03\x02\x02\x02\u0130-\x03\x02\x02\x02\u0131" +
		"\u0133\x050\x19\x02\u0132\u0134\x05.\x18\x02\u0133\u0132\x03\x02\x02\x02" +
		"\u0133\u0134\x03\x02\x02\x02\u0134/\x03\x02\x02\x02\u0135\u0142\x052\x1A" +
		"\x02\u0136\u0142\x05:\x1E\x02\u0137\u0142\x056\x1C\x02\u0138\u0142\x05" +
		"D#\x02\u0139\u0142\x058\x1D\x02\u013A\u0142\x05L\'\x02\u013B\u0142\x05" +
		"P)\x02\u013C\u0142\x05R*\x02\u013D\u0142\x05T+\x02\u013E\u0142\x05l7\x02" +
		"\u013F\u0142\x05\x98M\x02\u0140\u0142\x07;\x02\x02\u0141\u0135\x03\x02" +
		"\x02\x02\u0141\u0136\x03\x02\x02\x02\u0141\u0137\x03\x02\x02\x02\u0141" +
		"\u0138\x03\x02\x02\x02\u0141\u0139\x03\x02\x02\x02\u0141\u013A\x03\x02" +
		"\x02\x02\u0141\u013B\x03\x02\x02\x02\u0141\u013C\x03\x02\x02\x02\u0141" +
		"\u013D\x03\x02\x02\x02\u0141\u013E\x03\x02\x02\x02\u0141\u013F\x03\x02" +
		"\x02\x02\u0141\u0140\x03\x02\x02\x02\u01421\x03\x02\x02\x02\u0143\u0144" +
		"\x054\x1B\x02\u0144\u0145\x07.\x02\x02\u01453\x03\x02\x02\x02\u0146\u0147" +
		"\t\x06\x02\x02\u01475\x03\x02\x02\x02\u0148\u014A\x07\n\x02\x02\u0149" +
		"\u014B\x05$\x13\x02\u014A\u0149\x03\x02\x02\x02\u014A\u014B\x03\x02\x02" +
		"\x02\u014B\u014C\x03\x02\x02\x02\u014C\u014D\x05\n\x06\x02\u014D\u014E" +
		"\x07;\x02\x02\u014E7\x03\x02\x02\x02\u014F\u0150\x07$\x02\x02\u0150\u0151" +
		"\x05n8\x02\u01519\x03\x02\x02\x02\u0152\u0154\x05\x96L\x02\u0153\u0152" +
		"\x03\x02\x02\x02\u0153\u0154\x03\x02\x02\x02\u0154\u0156\x03\x02\x02\x02" +
		"\u0155\u0157\x05\x8AF\x02\u0156\u0155\x03\x02\x02\x02\u0156\u0157\x03" +
		"\x02\x02\x02\u0157\u015B\x03\x02\x02\x02\u0158\u015A\x05\x80A\x02\u0159" +
		"\u0158\x03\x02\x02\x02\u015A\u015D\x03\x02\x02\x02\u015B\u0159\x03\x02" +
		"\x02\x02\u015B\u015C\x03\x02\x02\x02\u015C\u015F\x03\x02\x02\x02\u015D" +
		"\u015B\x03\x02\x02\x02\u015E\u0160\x05\x12\n\x02\u015F\u015E\x03\x02\x02" +
		"\x02\u015F\u0160\x03\x02\x02\x02\u0160\u0161\x03\x02\x02\x02\u0161\u0162" +
		"\x05~@\x02\u0162\u0166\x05n8\x02\u0163\u0165\x05> \x02\u0164\u0163\x03" +
		"\x02\x02\x02\u0165\u0168\x03\x02\x02\x02\u0166\u0164\x03\x02\x02\x02\u0166" +
		"\u0167\x03\x02\x02\x02\u0167\u0169\x03\x02\x02\x02\u0168\u0166\x03\x02" +
		"\x02\x02\u0169\u016A\x05<\x1F\x02\u016A;\x03\x02\x02\x02\u016B\u016D\x07" +
		";\x02\x02\u016C\u016B\x03\x02\x02\x02\u016C\u016D\x03\x02\x02\x02\u016D" +
		"\u017D\x03\x02\x02\x02\u016E\u0170\x05r:\x02\u016F\u0171\x07;\x02\x02" +
		"\u0170\u016F\x03\x02\x02\x02\u0170\u0171\x03\x02\x02\x02\u0171\u017D\x03" +
		"\x02\x02\x02\u0172\u0173\x07.\x02\x02\u0173\u0174\x05@!\x02\u0174\u0176" +
		"\x05r:\x02\u0175\u0177\x07;\x02\x02\u0176\u0175\x03\x02\x02\x02\u0176" +
		"\u0177\x03\x02\x02\x02\u0177\u017D\x03\x02\x02\x02\u0178\u0179\x070\x02" +
		"\x02\u0179\u017A\x05\x0E\b\x02\u017A\u017B\x07;\x02\x02\u017B\u017D\x03" +
		"\x02\x02\x02\u017C\u016C\x03\x02\x02\x02\u017C\u016E\x03\x02\x02\x02\u017C" +
		"\u0172\x03\x02\x02\x02\u017C\u0178\x03\x02\x02\x02\u017D=\x03\x02\x02" +
		"\x02\u017E\u017F\t\x07\x02\x02\u017F?\x03\x02\x02\x02\u0180\u0186\x05" +
		"B\"\x02\u0181\u0182\x05B\"\x02\u0182\u0183\x07/\x02\x02\u0183\u0184\x05" +
		"@!\x02\u0184\u0186\x03\x02\x02\x02\u0185\u0180\x03\x02\x02\x02\u0185\u0181" +
		"\x03\x02\x02\x02\u0186A\x03\x02\x02\x02\u0187\u0188\x05\n\x06\x02\u0188" +
		"\u0189\x05n8\x02\u0189C\x03\x02\x02\x02\u018A\u018C\x05\x92J\x02\u018B" +
		"\u018A\x03\x02\x02\x02\u018B\u018C\x03\x02\x02\x02\u018C\u018E\x03\x02" +
		"\x02\x02\u018D\u018F\x05\x12\n\x02\u018E\u018D\x03\x02\x02\x02\u018E\u018F" +
		"\x03\x02\x02\x02\u018F\u0190\x03\x02\x02\x02\u0190\u0192\x05\n\x06\x02" +
		"\u0191\u0193\x05z>\x02\u0192\u0191\x03\x02\x02\x02\u0192\u0193\x03\x02" +
		"\x02\x02\u0193\u0195\x03\x02\x02\x02\u0194\u0196\x05F$\x02\u0195\u0194" +
		"\x03\x02\x02\x02\u0195\u0196\x03\x02\x02\x02\u0196\u0197\x03\x02\x02\x02" +
		"\u0197\u0198\x07;\x02\x02\u0198E\x03\x02\x02\x02\u0199\u019A\x07.\x02" +
		"\x02\u019A\u01A6\x05\b\x05\x02\u019B\u019C\x070\x02\x02\u019C\u019D\x05" +
		"\n\x06\x02\u019D\u019E\x05n8\x02\u019E\u01A6\x03\x02\x02\x02\u019F\u01A0" +
		"\x070\x02\x02\u01A0\u01A1\x05\n\x06\x02\u01A1\u01A2\x05r:\x02\u01A2\u01A6" +
		"\x03\x02\x02\x02\u01A3\u01A4\x070\x02\x02\u01A4\u01A6\x05H%\x02\u01A5" +
		"\u0199\x03\x02\x02\x02\u01A5\u019B\x03\x02\x02\x02\u01A5\u019F\x03\x02" +
		"\x02\x02\u01A5\u01A3\x03\x02\x02\x02\u01A6G\x03\x02\x02\x02\u01A7\u01A8" +
		"\b%\x01\x02\u01A8\u01AB\x05\b\x05\x02\u01A9\u01AB\x05\n\x06\x02\u01AA" +
		"\u01A7\x03\x02\x02\x02\u01AA\u01A9\x03\x02\x02\x02\u01AB\u01BA\x03\x02" +
		"\x02\x02\u01AC\u01AD\f\x06\x02\x02\u01AD\u01AE\x079\x02\x02\u01AE\u01B9" +
		"\x05H%\x07\u01AF\u01B0\f\x05\x02\x02\u01B0\u01B1\x071\x02\x02\u01B1\u01B9" +
		"\x05H%\x06\u01B2\u01B3\f\x04\x02\x02\u01B3\u01B4\x07=\x02\x02\u01B4\u01B9" +
		"\x05H%\x05\u01B5\u01B6\f\x03\x02\x02\u01B6\u01B7\x07(\x02\x02\u01B7\u01B9" +
		"\x05H%\x04\u01B8\u01AC\x03\x02\x02\x02\u01B8\u01AF\x03\x02\x02\x02\u01B8" +
		"\u01B2\x03\x02\x02\x02\u01B8\u01B5\x03\x02\x02\x02\u01B9\u01BC\x03\x02" +
		"\x02\x02\u01BA\u01B8\x03\x02\x02\x02\u01BA\u01BB\x03\x02\x02\x02\u01BB" +
		"I\x03\x02\x02\x02\u01BC\u01BA\x03\x02\x02\x02\u01BD\u01C0\x05\n\x06\x02" +
		"\u01BE\u01C0\x05\x0E\b\x02\u01BF\u01BD\x03\x02\x02\x02\u01BF\u01BE\x03" +
		"\x02\x02\x02\u01C0K\x03\x02\x02\x02\u01C1\u01C3\x07\x07\x02\x02\u01C2" +
		"\u01C4\x05\n\x06\x02\u01C3\u01C2\x03\x02\x02\x02\u01C3\u01C4\x03\x02\x02" +
		"\x02\u01C4\u01C5\x03\x02\x02\x02\u01C5\u01C6\x05r:\x02\u01C6M\x03\x02" +
		"\x02\x02\u01C7\u01C8\x07.\x02\x02\u01C8\u01C9\x07?\x02\x02\u01C9O\x03" +
		"\x02\x02\x02\u01CA\u01CB\x07\x07\x02\x02\u01CB\u01CC\x07\x03\x02\x02\u01CC" +
		"\u01CE\x05\n\x06\x02\u01CD\u01CF\x05N(\x02\u01CE\u01CD\x03\x02\x02\x02" +
		"\u01CE\u01CF\x03\x02\x02\x02\u01CF\u01D0\x03\x02\x02\x02\u01D0\u01D1\x05" +
		"r:\x02\u01D1Q\x03\x02\x02\x02\u01D2\u01D3\x07\x03\x02\x02\u01D3\u01D5" +
		"\x05\n\x06\x02\u01D4\u01D6\x05&\x14\x02\u01D5\u01D4\x03\x02\x02\x02\u01D5" +
		"\u01D6\x03\x02\x02\x02\u01D6\u01D7\x03\x02\x02\x02\u01D7\u01D8\x05r:\x02" +
		"\u01D8S\x03\x02\x02\x02\u01D9\u01DA\x07\x14\x02\x02\u01DA\u01DC\x05\n" +
		"\x06\x02\u01DB\u01DD\x05&\x14\x02\u01DC\u01DB\x03\x02\x02\x02\u01DC\u01DD" +
		"\x03\x02\x02\x02\u01DD\u01DE\x03\x02\x02\x02\u01DE\u01DF\x05r:\x02\u01DF" +
		"U\x03\x02\x02\x02\u01E0\u01E1\x07\x07\x02\x02\u01E1\u01E2\x073\x02\x02" +
		"\u01E2\u01E4\x05\\/\x02\u01E3\u01E5\x07/\x02\x02\u01E4\u01E3\x03\x02\x02" +
		"\x02\u01E4\u01E5\x03\x02\x02\x02\u01E5\u01E6\x03\x02\x02\x02\u01E6\u01E8" +
		"\x07+\x02\x02\u01E7\u01E9\x07;\x02\x02\u01E8\u01E7\x03\x02\x02\x02\u01E8" +
		"\u01E9\x03\x02\x02\x02\u01E9W\x03\x02\x02\x02\u01EA\u01EB\x05Z.\x02\u01EB" +
		"\u01EC\x073\x02\x02\u01EC\u01EE\x05\\/\x02\u01ED\u01EF\x07/\x02\x02\u01EE" +
		"\u01ED\x03\x02\x02\x02\u01EE\u01EF\x03\x02\x02\x02\u01EF\u01F0\x03\x02" +
		"\x02\x02\u01F0\u01F2\x07+\x02\x02\u01F1\u01F3\x07;\x02\x02\u01F2\u01F1" +
		"\x03\x02\x02\x02\u01F2\u01F3\x03\x02\x02\x02\u01F3Y\x03\x02\x02\x02\u01F4" +
		"\u01F6\x05\x88E\x02\u01F5\u01F4\x03\x02\x02\x02\u01F5\u01F6\x03\x02\x02" +
		"\x02\u01F6\u01F7\x03\x02\x02\x02\u01F7\u01F9\x07\x07\x02\x02\u01F8\u01FA" +
		"\x07\x03\x02";
	private static readonly _serializedATNSegment1: string =
		"\x02\u01F9\u01F8\x03\x02\x02\x02\u01F9\u01FA\x03\x02\x02\x02\u01FA\u01FB" +
		"\x03\x02\x02\x02\u01FB\u0208\x05\n\x06\x02\u01FC\u01FE\x05\x88E\x02\u01FD" +
		"\u01FC\x03\x02\x02\x02\u01FD\u01FE\x03\x02\x02\x02\u01FE\u01FF\x03\x02" +
		"\x02\x02\u01FF\u0201\x07\x07\x02\x02\u0200\u0202\x07\x03\x02\x02\u0201" +
		"\u0200\x03\x02\x02\x02\u0201\u0202\x03\x02\x02\x02\u0202\u0203\x03\x02" +
		"\x02\x02\u0203\u0204\x05\n\x06\x02\u0204\u0205\x07.\x02\x02\u0205\u0206" +
		"\x05\x12\n\x02\u0206\u0208\x03\x02\x02\x02\u0207\u01F5\x03\x02\x02\x02" +
		"\u0207\u01FD\x03\x02\x02\x02\u0208[\x03\x02\x02\x02\u0209\u020F\x05^0" +
		"\x02\u020A\u020B\x05^0\x02\u020B\u020C\x07/\x02\x02\u020C\u020D\x05\\" +
		"/\x02\u020D\u020F\x03\x02\x02\x02\u020E\u0209\x03\x02\x02\x02\u020E\u020A" +
		"\x03\x02\x02\x02\u020F]\x03\x02\x02\x02\u0210\u0212\x05\n\x06\x02\u0211" +
		"\u0213\x05`1\x02\u0212\u0211\x03\x02\x02\x02\u0212\u0213\x03\x02\x02\x02" +
		"\u0213\u0215\x03\x02\x02\x02\u0214\u0216\x05\x8EH\x02\u0215\u0214\x03" +
		"\x02\x02\x02\u0215\u0216\x03\x02\x02\x02\u0216_\x03\x02\x02\x02\u0217" +
		"\u0218\x070\x02\x02\u0218\u0219\x05\b\x05\x02\u0219a\x03\x02\x02\x02\u021A" +
		"\u021C\x05\x80A\x02\u021B\u021A\x03\x02\x02\x02\u021C\u021F\x03\x02\x02" +
		"\x02\u021D\u021B\x03\x02\x02\x02\u021D\u021E\x03\x02\x02\x02\u021E\u0221" +
		"\x03\x02\x02\x02\u021F\u021D\x03\x02\x02\x02\u0220\u0222\x05\x12\n\x02" +
		"\u0221\u0220\x03\x02\x02\x02\u0221\u0222\x03\x02\x02\x02\u0222\u0223\x03" +
		"\x02\x02\x02\u0223\u0224\x05~@\x02\u0224\u0226\x05n8\x02\u0225\u0227\x07" +
		"\x05\x02\x02\u0226\u0225\x03\x02\x02\x02\u0226\u0227\x03\x02\x02\x02\u0227" +
		"\u0229\x03\x02\x02\x02\u0228\u022A\x05r:\x02\u0229\u0228\x03\x02\x02\x02" +
		"\u0229\u022A\x03\x02\x02\x02\u022A\u022C\x03\x02\x02\x02\u022B\u022D\x07" +
		";\x02\x02\u022C\u022B\x03\x02\x02\x02\u022C\u022D\x03\x02\x02\x02\u022D" +
		"c\x03\x02\x02\x02\u022E\u0230\x05\x80A\x02\u022F\u022E\x03\x02\x02\x02" +
		"\u0230\u0233\x03\x02\x02\x02\u0231\u022F\x03\x02\x02\x02\u0231\u0232\x03" +
		"\x02\x02\x02\u0232\u0235\x03\x02\x02\x02\u0233\u0231\x03\x02\x02\x02\u0234" +
		"\u0236\x05\x12\n\x02\u0235\u0234\x03\x02\x02\x02\u0235\u0236\x03\x02\x02" +
		"\x02\u0236\u0237\x03\x02\x02\x02\u0237\u0238\x05~@\x02\u0238\u0239\x07" +
		"0\x02\x02\u0239\u023A\x05r:\x02\u023A\u023B\x07;\x02\x02\u023Be\x03\x02" +
		"\x02\x02\u023C\u023D\x07\x13\x02\x02\u023D\u023E\x05\x12\n\x02\u023E\u023F" +
		"\x05\n\x06\x02\u023F\u0240\x070\x02\x02\u0240\u0241\x05\b\x05\x02\u0241" +
		"\u0242\x07;\x02\x02\u0242g\x03\x02\x02\x02\u0243\u0244\x07\t\x02\x02\u0244" +
		"\u0245\x05\x12\n\x02\u0245\u0246\x05\n\x06\x02\u0246\u0247\x05n8\x02\u0247" +
		"i\x03\x02\x02\x02\u0248\u0249\x05\n\x06\x02\u0249\u024A\x05n8\x02\u024A" +
		"\u024B\x07;\x02\x02\u024Bk\x03\x02\x02\x02\u024C\u024E\x07\x17\x02\x02" +
		"\u024D\u024F\x07\x18\x02\x02\u024E\u024D\x03\x02\x02\x02\u024E\u024F\x03" +
		"\x02\x02\x02\u024F\u0250\x03\x02\x02\x02\u0250\u0251\x05\x12\n\x02\u0251" +
		"\u0252\x05\n\x06\x02\u0252\u0253\x07;\x02\x02\u0253\u025D\x03\x02\x02" +
		"\x02\u0254\u0255\x07\x03\x02\x02\u0255\u0256\x05\n\x06\x02\u0256\u0257" +
		"\x07;\x02\x02\u0257\u025D\x03\x02\x02\x02\u0258\u0259\x07\x14\x02\x02" +
		"\u0259\u025A\x05\n\x06\x02\u025A\u025B\x07;\x02\x02\u025B\u025D\x03\x02" +
		"\x02\x02\u025C\u024C\x03\x02\x02\x02\u025C\u0254\x03\x02\x02\x02\u025C" +
		"\u0258\x03\x02\x02\x02\u025Dm\x03\x02\x02\x02\u025E\u0262\x074\x02\x02" +
		"\u025F\u0261\x05p9\x02\u0260\u025F\x03\x02\x02\x02\u0261\u0264\x03\x02" +
		"\x02\x02\u0262\u0260\x03\x02\x02\x02\u0262\u0263\x03\x02\x02\x02\u0263" +
		"\u0265\x03\x02\x02\x02\u0264\u0262\x03\x02\x02\x02\u0265\u0266\x07,\x02" +
		"\x02\u0266o\x03\x02\x02\x02\u0267\u0269\n\b\x02\x02\u0268\u0267\x03\x02" +
		"\x02\x02\u0269\u026A\x03\x02\x02\x02\u026A\u0268\x03\x02\x02\x02\u026A" +
		"\u026B\x03\x02\x02\x02\u026B\u026E\x03\x02\x02\x02\u026C\u026E\x05n8\x02" +
		"\u026D\u0268\x03\x02\x02\x02\u026D\u026C\x03\x02\x02\x02\u026Eq\x03\x02" +
		"\x02\x02\u026F\u0273\x073\x02\x02\u0270\u0272\x05t;\x02\u0271\u0270\x03" +
		"\x02\x02\x02\u0272\u0275\x03\x02\x02\x02\u0273\u0271\x03\x02\x02\x02\u0273" +
		"\u0274\x03\x02\x02\x02\u0274\u0276\x03\x02\x02\x02\u0275\u0273\x03\x02" +
		"\x02\x02\u0276\u0277\x07+\x02\x02\u0277s\x03\x02\x02\x02\u0278\u027A\n" +
		"\t\x02\x02\u0279\u0278\x03\x02\x02\x02\u027A\u027B\x03\x02\x02\x02\u027B" +
		"\u0279\x03\x02\x02\x02\u027B\u027C\x03\x02\x02\x02\u027C\u027F\x03\x02" +
		"\x02\x02\u027D\u027F\x05r:\x02\u027E\u0279\x03\x02\x02\x02\u027E\u027D" +
		"\x03\x02\x02\x02\u027Fu\x03\x02\x02\x02\u0280\u0284\x072\x02\x02\u0281" +
		"\u0283\x05x=\x02\u0282\u0281\x03\x02\x02\x02\u0283\u0286\x03\x02\x02\x02" +
		"\u0284\u0282\x03\x02\x02\x02\u0284\u0285\x03\x02\x02\x02\u0285\u0287\x03" +
		"\x02\x02\x02\u0286\u0284\x03\x02\x02\x02\u0287\u0288\x07*\x02\x02\u0288" +
		"w\x03\x02\x02\x02\u0289\u028B\n\n\x02\x02\u028A\u0289\x03\x02\x02\x02" +
		"\u028B\u028C\x03\x02\x02\x02\u028C\u028A\x03\x02\x02\x02\u028C\u028D\x03" +
		"\x02\x02\x02\u028D\u0290\x03\x02\x02\x02\u028E\u0290\x05v<\x02\u028F\u028A" +
		"\x03\x02\x02\x02\u028F\u028E\x03\x02\x02\x02\u0290y\x03\x02\x02\x02\u0291" +
		"\u0295\x075\x02\x02\u0292\u0294\x05|?\x02\u0293\u0292\x03\x02\x02\x02" +
		"\u0294\u0297\x03\x02\x02\x02\u0295\u0293\x03\x02\x02\x02\u0295\u0296\x03" +
		"\x02\x02\x02\u0296\u0298\x03\x02\x02\x02\u0297\u0295\x03\x02\x02\x02\u0298" +
		"\u0299\x07-\x02\x02\u0299{\x03\x02\x02\x02\u029A\u029C\n\v\x02\x02\u029B" +
		"\u029A\x03\x02\x02\x02\u029C\u029D\x03\x02\x02\x02\u029D\u029B\x03\x02" +
		"\x02\x02\u029D\u029E\x03\x02\x02\x02\u029E\u02A1\x03\x02\x02\x02\u029F" +
		"\u02A1\x05z>\x02\u02A0\u029B\x03\x02\x02\x02\u02A0\u029F\x03\x02\x02\x02" +
		"\u02A1}\x03\x02\x02\x02\u02A2\u02A4\x07>\x02\x02\u02A3\u02A2\x03\x02\x02" +
		"\x02\u02A3\u02A4\x03\x02\x02\x02\u02A4\u02A5\x03\x02\x02\x02\u02A5\u02C6" +
		"\x05\n\x06\x02\u02A6\u02A7\x07\x0E\x02\x02\u02A7\u02C6\x070\x02\x02\u02A8" +
		"\u02A9\x07\x0E\x02\x02\u02A9\u02AA\x070\x02\x02\u02AA\u02C6\x070\x02\x02" +
		"\u02AB\u02AC\x07\x0E\x02\x02\u02AC\u02AD\x07)\x02\x02\u02AD\u02C6\x07" +
		"0\x02\x02\u02AE\u02AF\x07\x0E\x02\x02\u02AF\u02C6\x079\x02\x02\u02B0\u02B1" +
		"\x07\x0E\x02\x02\u02B1\u02C6\x071\x02\x02\u02B2\u02B3\x07\x0E\x02\x02" +
		"\u02B3\u02B4\x075\x02\x02\u02B4\u02C6\x07-\x02\x02\u02B5\u02B6\x07\x0E" +
		"\x02\x02\u02B6\u02C6\x072\x02\x02\u02B7\u02B8\x07\x0E\x02\x02\u02B8\u02B9" +
		"\x072\x02\x02\u02B9\u02C6\x072\x02\x02\u02BA\u02BB\x07\x0E\x02\x02\u02BB" +
		"\u02C6\x07*\x02\x02\u02BC\u02BD\x07\x0E\x02\x02\u02BD\u02BE\x07*\x02\x02" +
		"\u02BE\u02C6\x07*\x02\x02\u02BF\u02C0\x07\x0E\x02\x02\u02C0\u02C1\x07" +
		"4\x02\x02\u02C1\u02C6\x07,\x02\x02\u02C2\u02C3\x07\x0E\x02\x02\u02C3\u02C4" +
		"\x071\x02\x02\u02C4\u02C6\x07*\x02\x02\u02C5\u02A3\x03\x02\x02\x02\u02C5" +
		"\u02A6\x03\x02\x02\x02\u02C5\u02A8\x03\x02\x02\x02\u02C5\u02AB\x03\x02" +
		"\x02\x02\u02C5\u02AE\x03\x02\x02\x02\u02C5\u02B0\x03\x02\x02\x02\u02C5" +
		"\u02B2\x03\x02\x02\x02\u02C5\u02B5\x03\x02\x02\x02\u02C5\u02B7\x03\x02" +
		"\x02\x02\u02C5\u02BA\x03\x02\x02\x02\u02C5\u02BC\x03\x02\x02\x02\u02C5" +
		"\u02BF\x03\x02\x02\x02\u02C5\u02C2\x03\x02\x02\x02\u02C6\x7F\x03\x02\x02" +
		"\x02\u02C7\u02D1\x07\x13\x02\x02\u02C8\u02D1\x07\x05\x02\x02\u02C9\u02D1" +
		"\x07\x06\x02\x02\u02CA\u02D1\x07\x1A\x02\x02\u02CB\u02D1\x07\t\x02\x02" +
		"\u02CC\u02D1\x07\v\x02\x02\u02CD\u02D1\x07\n\x02\x02\u02CE\u02CF\x07\x15" +
		"\x02\x02\u02CF\u02D1\x05v<\x02\u02D0\u02C7\x03\x02\x02\x02\u02D0\u02C8" +
		"\x03\x02\x02\x02\u02D0\u02C9\x03\x02\x02\x02\u02D0\u02CA\x03\x02\x02\x02" +
		"\u02D0\u02CB\x03\x02\x02\x02\u02D0\u02CC\x03\x02\x02\x02\u02D0\u02CD\x03" +
		"\x02\x02\x02\u02D0\u02CE\x03\x02\x02\x02\u02D1\x81\x03\x02\x02\x02\u02D2" +
		"\u02D3\x07\r\x02\x02\u02D3\u02D4\x05\n\x06\x02\u02D4\u02D5\x05r:\x02\u02D5" +
		"\x83\x03\x02\x02\x02\u02D6\u02D7\x07\x19\x02\x02\u02D7\u02D8\x05\n\x06" +
		"\x02\u02D8\u02D9\x070\x02\x02\u02D9\u02DA\x05\n\x06\x02\u02DA\x85\x03" +
		"\x02\x02\x02\u02DB\u02DC\x07\x1B\x02\x02\u02DC\u02DD\x05\x9AN\x02\u02DD" +
		"\x87\x03\x02\x02\x02\u02DE\u02DF\x07\x1C\x02\x02\u02DF\u02E0\x05\x9AN" +
		"\x02\u02E0\x89\x03\x02\x02\x02\u02E1\u02E3\x07\t\x02\x02\u02E2\u02E1\x03" +
		"\x02\x02\x02\u02E2\u02E3\x03\x02\x02\x02\u02E3\u02E4\x03\x02\x02\x02\u02E4" +
		"\u02E5\x07\x1D\x02\x02\u02E5\u02E6\x05\x9AN\x02\u02E6\x8B\x03\x02\x02" +
		"\x02\u02E7\u02E8\x07\x1E\x02\x02\u02E8\u02E9\x05\x9AN\x02\u02E9\x8D\x03" +
		"\x02\x02\x02\u02EA\u02EB\x07\x1F\x02\x02\u02EB\u02EC\x05\x9AN\x02\u02EC" +
		"\x8F\x03\x02\x02\x02\u02ED\u02EE\x07 \x02\x02\u02EE\u02EF\x05\x9AN\x02" +
		"\u02EF\x91\x03\x02\x02\x02\u02F0\u02F1\x07!\x02\x02\u02F1\u02F2\x05\x9A" +
		"N\x02\u02F2\x93\x03\x02\x02\x02\u02F3\u02F4\x07\"\x02\x02\u02F4\u02F5" +
		"\x05\x9AN\x02\u02F5\x95\x03\x02\x02\x02\u02F6\u02F7\x07#\x02\x02\u02F7" +
		"\u02F8\x05\x9AN\x02\u02F8\x97\x03\x02\x02\x02\u02F9\u02FA\x07&\x02\x02" +
		"\u02FA\u02FB\x05\x9AN\x02\u02FB\x99\x03\x02\x02\x02\u02FC\u02FE\x074\x02" +
		"\x02\u02FD\u02FF\x05\x9CO\x02\u02FE\u02FD\x03\x02\x02\x02\u02FE\u02FF" +
		"\x03\x02\x02\x02\u02FF\u0300\x03\x02\x02\x02\u0300\u0301\x07,\x02\x02" +
		"\u0301\x9B\x03\x02\x02\x02\u0302\u0309\x05\x9EP\x02\u0303\u0304\x05\x9E" +
		"P\x02\u0304\u0306\x07/\x02\x02\u0305\u0307\x05\x9CO\x02\u0306\u0305\x03" +
		"\x02\x02\x02\u0306\u0307\x03\x02\x02\x02\u0307\u0309\x03\x02\x02\x02\u0308" +
		"\u0302\x03\x02\x02\x02\u0308\u0303\x03\x02\x02\x02\u0309\x9D\x03\x02\x02" +
		"\x02\u030A\u030F\x05\n\x06\x02\u030B\u030F\x05\b\x05\x02\u030C\u030F\x05" +
		"\xA0Q\x02\u030D\u030F\x05\x9AN\x02\u030E\u030A\x03\x02\x02\x02\u030E\u030B" +
		"\x03\x02\x02\x02\u030E\u030C\x03\x02\x02\x02\u030E\u030D\x03\x02\x02\x02" +
		"\u030F\x9F\x03\x02\x02\x02\u0310\u0311\x05\n\x06\x02\u0311\u0312\x070" +
		"\x02\x02\u0312\u0313\x05\x9EP\x02\u0313\xA1\x03\x02\x02\x02^\xA5\xB5\xB9" +
		"\xBE\xC5\xD0\xD5\xD8\xDB\xDE\xEA\xF0\xF4\xF7\u0100\u0103\u0106\u010A\u010E" +
		"\u0111\u0116\u0125\u0128\u012C\u012F\u0133\u0141\u014A\u0153\u0156\u015B" +
		"\u015F\u0166\u016C\u0170\u0176\u017C\u0185\u018B\u018E\u0192\u0195\u01A5" +
		"\u01AA\u01B8\u01BA\u01BF\u01C3\u01CE\u01D5\u01DC\u01E4\u01E8\u01EE\u01F2" +
		"\u01F5\u01F9\u01FD\u0201\u0207\u020E\u0212\u0215\u021D\u0221\u0226\u0229" +
		"\u022C\u0231\u0235\u024E\u025C\u0262\u026A\u026D\u0273\u027B\u027E\u0284" +
		"\u028C\u028F\u0295\u029D\u02A0\u02A3\u02C5\u02D0\u02E2\u02FE\u0306\u0308" +
		"\u030E";
	public static readonly _serializedATN: string = Utils.join(
		[
			SatisfactoryHeaderParser._serializedATNSegment0,
			SatisfactoryHeaderParser._serializedATNSegment1,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!SatisfactoryHeaderParser.__ATN) {
			SatisfactoryHeaderParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(SatisfactoryHeaderParser._serializedATN));
		}

		return SatisfactoryHeaderParser.__ATN;
	}

}

export class FileContext extends ParserRuleContext {
	public element(): ElementContext[];
	public element(i: number): ElementContext;
	public element(i?: number): ElementContext | ElementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElementContext);
		} else {
			return this.getRuleContext(i, ElementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_file; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterFile) {
			listener.enterFile(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitFile) {
			listener.exitFile(this);
		}
	}
}


export class ElementContext extends ParserRuleContext {
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	public namespaceDeclaration(): NamespaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, NamespaceDeclarationContext);
	}
	public staticMethodCall(): StaticMethodCallContext | undefined {
		return this.tryGetRuleContext(0, StaticMethodCallContext);
	}
	public staticFunctionDeclaration(): StaticFunctionDeclarationContext | undefined {
		return this.tryGetRuleContext(0, StaticFunctionDeclarationContext);
	}
	public staticArrayDeclaration(): StaticArrayDeclarationContext | undefined {
		return this.tryGetRuleContext(0, StaticArrayDeclarationContext);
	}
	public staticInlineFunctionDeclaration(): StaticInlineFunctionDeclarationContext | undefined {
		return this.tryGetRuleContext(0, StaticInlineFunctionDeclarationContext);
	}
	public staticPropertyDeclaration(): StaticPropertyDeclarationContext | undefined {
		return this.tryGetRuleContext(0, StaticPropertyDeclarationContext);
	}
	public typedef(): TypedefContext | undefined {
		return this.tryGetRuleContext(0, TypedefContext);
	}
	public usingNamespace(): UsingNamespaceContext | undefined {
		return this.tryGetRuleContext(0, UsingNamespaceContext);
	}
	public globalVariableDeclaration(): GlobalVariableDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GlobalVariableDeclarationContext);
	}
	public genericEnumDeclaration(): GenericEnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GenericEnumDeclarationContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_element; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterElement) {
			listener.enterElement(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitElement) {
			listener.exitElement(this);
		}
	}
}


export class ValueContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_value; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterValue) {
			listener.enterValue(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitValue) {
			listener.exitValue(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public numericLiteral(): NumericLiteralContext | undefined {
		return this.tryGetRuleContext(0, NumericLiteralContext);
	}
	public booleanLiteral(): BooleanLiteralContext | undefined {
		return this.tryGetRuleContext(0, BooleanLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_literal; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
}


export class IdentifierContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.IDENTIFIER);
		} else {
			return this.getToken(SatisfactoryHeaderParser.IDENTIFIER, i);
		}
	}
	public COLON(): TerminalNode[];
	public COLON(i: number): TerminalNode;
	public COLON(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.COLON);
		} else {
			return this.getToken(SatisfactoryHeaderParser.COLON, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_identifier; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterIdentifier) {
			listener.enterIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitIdentifier) {
			listener.exitIdentifier(this);
		}
	}
}


export class StringLiteralContext extends ParserRuleContext {
	public STRING_LITERAL(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_stringLiteral; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterStringLiteral) {
			listener.enterStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitStringLiteral) {
			listener.exitStringLiteral(this);
		}
	}
}


export class NumericLiteralContext extends ParserRuleContext {
	public INTEGER_LITERAL(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.INTEGER_LITERAL, 0); }
	public FLOAT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.FLOAT_LITERAL, 0); }
	public HEX_LITERAL(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.HEX_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_numericLiteral; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterNumericLiteral) {
			listener.enterNumericLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitNumericLiteral) {
			listener.exitNumericLiteral(this);
		}
	}
}


export class BooleanLiteralContext extends ParserRuleContext {
	public TRUE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.TRUE, 0); }
	public FALSE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.FALSE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_booleanLiteral; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterBooleanLiteral) {
			listener.enterBooleanLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitBooleanLiteral) {
			listener.exitBooleanLiteral(this);
		}
	}
}


export class TypeDeclarationContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public typeModifier(): TypeModifierContext[];
	public typeModifier(i: number): TypeModifierContext;
	public typeModifier(i?: number): TypeModifierContext | TypeModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeModifierContext);
		} else {
			return this.getRuleContext(i, TypeModifierContext);
		}
	}
	public templateType(): TemplateTypeContext | undefined {
		return this.tryGetRuleContext(0, TemplateTypeContext);
	}
	public typeReferenceType(): TypeReferenceTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeReferenceTypeContext);
	}
	public CONSTEXPR(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CONSTEXPR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_typeDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterTypeDeclaration) {
			listener.enterTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitTypeDeclaration) {
			listener.exitTypeDeclaration(this);
		}
	}
}


export class TemplateTypeContext extends ParserRuleContext {
	public contentWithNestedAngles(): ContentWithNestedAnglesContext {
		return this.getRuleContext(0, ContentWithNestedAnglesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_templateType; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterTemplateType) {
			listener.enterTemplateType(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitTemplateType) {
			listener.exitTemplateType(this);
		}
	}
}


export class TypeModifierContext extends ParserRuleContext {
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CLASS, 0); }
	public CONST(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CONST, 0); }
	public CONSTEXPR(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CONSTEXPR, 0); }
	public ENUM(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.ENUM, 0); }
	public STRUCT(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.STRUCT, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.STATIC, 0); }
	public MUTABLE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.MUTABLE, 0); }
	public uParamMacro(): UParamMacroContext | undefined {
		return this.tryGetRuleContext(0, UParamMacroContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_typeModifier; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterTypeModifier) {
			listener.enterTypeModifier(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitTypeModifier) {
			listener.exitTypeModifier(this);
		}
	}
}


export class TypeReferenceTypeContext extends ParserRuleContext {
	public STAR(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.STAR, 0); }
	public AMPERSAND(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.AMPERSAND, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_typeReferenceType; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterTypeReferenceType) {
			listener.enterTypeReferenceType(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitTypeReferenceType) {
			listener.exitTypeReferenceType(this);
		}
	}
}


export class GlobalVariableDeclarationContext extends ParserRuleContext {
	public EXTERN(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.EXTERN, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public contentWithNestedSquares(): ContentWithNestedSquaresContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedSquaresContext);
	}
	public classPropertyDefaultValue(): ClassPropertyDefaultValueContext | undefined {
		return this.tryGetRuleContext(0, ClassPropertyDefaultValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_globalVariableDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterGlobalVariableDeclaration) {
			listener.enterGlobalVariableDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitGlobalVariableDeclaration) {
			listener.exitGlobalVariableDeclaration(this);
		}
	}
}


export class ClassDeclarationContext extends ParserRuleContext {
	public classHeader(): ClassHeaderContext {
		return this.getRuleContext(0, ClassHeaderContext);
	}
	public OPEN_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_BRACE, 0); }
	public classBody(): ClassBodyContext {
		return this.getRuleContext(0, ClassBodyContext);
	}
	public CLOSE_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_BRACE, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassDeclaration) {
			listener.enterClassDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassDeclaration) {
			listener.exitClassDeclaration(this);
		}
	}
}


export class ClassHeaderContext extends ParserRuleContext {
	public classKeyword(): ClassKeywordContext {
		return this.getRuleContext(0, ClassKeywordContext);
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public classMacro(): ClassMacroContext | undefined {
		return this.tryGetRuleContext(0, ClassMacroContext);
	}
	public templateDeclaration(): TemplateDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TemplateDeclarationContext);
	}
	public SF_CLASS_TAG(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SF_CLASS_TAG, 0); }
	public contentWithNestedAngles(): ContentWithNestedAnglesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedAnglesContext);
	}
	public classInheritance(): ClassInheritanceContext | undefined {
		return this.tryGetRuleContext(0, ClassInheritanceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classHeader; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassHeader) {
			listener.enterClassHeader(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassHeader) {
			listener.exitClassHeader(this);
		}
	}
}


export class ClassMacroContext extends ParserRuleContext {
	public uclassMacro(): UclassMacroContext | undefined {
		return this.tryGetRuleContext(0, UclassMacroContext);
	}
	public uinterfaceMacro(): UinterfaceMacroContext | undefined {
		return this.tryGetRuleContext(0, UinterfaceMacroContext);
	}
	public ustructMacro(): UstructMacroContext | undefined {
		return this.tryGetRuleContext(0, UstructMacroContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassMacro) {
			listener.enterClassMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassMacro) {
			listener.exitClassMacro(this);
		}
	}
}


export class TemplateDeclarationContext extends ParserRuleContext {
	public TEMPLATE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.TEMPLATE, 0); }
	public contentWithNestedAngles(): ContentWithNestedAnglesContext {
		return this.getRuleContext(0, ContentWithNestedAnglesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_templateDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterTemplateDeclaration) {
			listener.enterTemplateDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitTemplateDeclaration) {
			listener.exitTemplateDeclaration(this);
		}
	}
}


export class ClassKeywordContext extends ParserRuleContext {
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CLASS, 0); }
	public STRUCT(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.STRUCT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classKeyword; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassKeyword) {
			listener.enterClassKeyword(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassKeyword) {
			listener.exitClassKeyword(this);
		}
	}
}


export class ClassInheritanceContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.COLON, 0); }
	public classExtensionList(): ClassExtensionListContext {
		return this.getRuleContext(0, ClassExtensionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classInheritance; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassInheritance) {
			listener.enterClassInheritance(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassInheritance) {
			listener.exitClassInheritance(this);
		}
	}
}


export class ClassExtensionListContext extends ParserRuleContext {
	public classExtension(): ClassExtensionContext {
		return this.getRuleContext(0, ClassExtensionContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COMMA, 0); }
	public classExtensionList(): ClassExtensionListContext | undefined {
		return this.tryGetRuleContext(0, ClassExtensionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classExtensionList; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassExtensionList) {
			listener.enterClassExtensionList(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassExtensionList) {
			listener.exitClassExtensionList(this);
		}
	}
}


export class ClassExtensionContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public classVisibilityModifier(): ClassVisibilityModifierContext | undefined {
		return this.tryGetRuleContext(0, ClassVisibilityModifierContext);
	}
	public contentWithNestedAngles(): ContentWithNestedAnglesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedAnglesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classExtension; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassExtension) {
			listener.enterClassExtension(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassExtension) {
			listener.exitClassExtension(this);
		}
	}
}


export class ClassBodyContext extends ParserRuleContext {
	public classEntries(): ClassEntriesContext | undefined {
		return this.tryGetRuleContext(0, ClassEntriesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classBody; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassBody) {
			listener.enterClassBody(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassBody) {
			listener.exitClassBody(this);
		}
	}
}


export class ClassEntriesContext extends ParserRuleContext {
	public classEntry(): ClassEntryContext {
		return this.getRuleContext(0, ClassEntryContext);
	}
	public classEntries(): ClassEntriesContext | undefined {
		return this.tryGetRuleContext(0, ClassEntriesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classEntries; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassEntries) {
			listener.enterClassEntries(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassEntries) {
			listener.exitClassEntries(this);
		}
	}
}


export class ClassEntryContext extends ParserRuleContext {
	public classVisibility(): ClassVisibilityContext | undefined {
		return this.tryGetRuleContext(0, ClassVisibilityContext);
	}
	public classMethod(): ClassMethodContext | undefined {
		return this.tryGetRuleContext(0, ClassMethodContext);
	}
	public friendDeclaration(): FriendDeclarationContext | undefined {
		return this.tryGetRuleContext(0, FriendDeclarationContext);
	}
	public classProperty(): ClassPropertyContext | undefined {
		return this.tryGetRuleContext(0, ClassPropertyContext);
	}
	public statDeclaration(): StatDeclarationContext | undefined {
		return this.tryGetRuleContext(0, StatDeclarationContext);
	}
	public nestedEnum(): NestedEnumContext | undefined {
		return this.tryGetRuleContext(0, NestedEnumContext);
	}
	public nestedEnumClass(): NestedEnumClassContext | undefined {
		return this.tryGetRuleContext(0, NestedEnumClassContext);
	}
	public nestedClass(): NestedClassContext | undefined {
		return this.tryGetRuleContext(0, NestedClassContext);
	}
	public nestedStruct(): NestedStructContext | undefined {
		return this.tryGetRuleContext(0, NestedStructContext);
	}
	public typedef(): TypedefContext | undefined {
		return this.tryGetRuleContext(0, TypedefContext);
	}
	public generatedBodyMacro(): GeneratedBodyMacroContext | undefined {
		return this.tryGetRuleContext(0, GeneratedBodyMacroContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classEntry; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassEntry) {
			listener.enterClassEntry(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassEntry) {
			listener.exitClassEntry(this);
		}
	}
}


export class ClassVisibilityContext extends ParserRuleContext {
	public classVisibilityModifier(): ClassVisibilityModifierContext {
		return this.getRuleContext(0, ClassVisibilityModifierContext);
	}
	public COLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.COLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classVisibility; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassVisibility) {
			listener.enterClassVisibility(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassVisibility) {
			listener.exitClassVisibility(this);
		}
	}
}


export class ClassVisibilityModifierContext extends ParserRuleContext {
	public PUBLIC(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.PUBLIC, 0); }
	public PROTECTED(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.PROTECTED, 0); }
	public PRIVATE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.PRIVATE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classVisibilityModifier; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassVisibilityModifier) {
			listener.enterClassVisibilityModifier(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassVisibilityModifier) {
			listener.exitClassVisibilityModifier(this);
		}
	}
}


export class FriendDeclarationContext extends ParserRuleContext {
	public FRIEND(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.FRIEND, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	public classKeyword(): ClassKeywordContext | undefined {
		return this.tryGetRuleContext(0, ClassKeywordContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_friendDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterFriendDeclaration) {
			listener.enterFriendDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitFriendDeclaration) {
			listener.exitFriendDeclaration(this);
		}
	}
}


export class StatDeclarationContext extends ParserRuleContext {
	public STAT(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.STAT, 0); }
	public contentWithNestedParens(): ContentWithNestedParensContext {
		return this.getRuleContext(0, ContentWithNestedParensContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_statDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterStatDeclaration) {
			listener.enterStatDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitStatDeclaration) {
			listener.exitStatDeclaration(this);
		}
	}
}


export class ClassMethodContext extends ParserRuleContext {
	public functionName(): FunctionNameContext {
		return this.getRuleContext(0, FunctionNameContext);
	}
	public contentWithNestedParens(): ContentWithNestedParensContext {
		return this.getRuleContext(0, ContentWithNestedParensContext);
	}
	public classMethodEnd(): ClassMethodEndContext {
		return this.getRuleContext(0, ClassMethodEndContext);
	}
	public uedeprecatedMacro(): UedeprecatedMacroContext | undefined {
		return this.tryGetRuleContext(0, UedeprecatedMacroContext);
	}
	public ufunctionMacro(): UfunctionMacroContext | undefined {
		return this.tryGetRuleContext(0, UfunctionMacroContext);
	}
	public functionModifier(): FunctionModifierContext[];
	public functionModifier(i: number): FunctionModifierContext;
	public functionModifier(i?: number): FunctionModifierContext | FunctionModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FunctionModifierContext);
		} else {
			return this.getRuleContext(i, FunctionModifierContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public classMethodResultModifier(): ClassMethodResultModifierContext[];
	public classMethodResultModifier(i: number): ClassMethodResultModifierContext;
	public classMethodResultModifier(i?: number): ClassMethodResultModifierContext | ClassMethodResultModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassMethodResultModifierContext);
		} else {
			return this.getRuleContext(i, ClassMethodResultModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classMethod; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassMethod) {
			listener.enterClassMethod(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassMethod) {
			listener.exitClassMethod(this);
		}
	}
}


export class ClassMethodEndContext extends ParserRuleContext {
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	public contentWithNestedBraces(): ContentWithNestedBracesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedBracesContext);
	}
	public COLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COLON, 0); }
	public classInitializerList(): ClassInitializerListContext | undefined {
		return this.tryGetRuleContext(0, ClassInitializerListContext);
	}
	public EQUALS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.EQUALS, 0); }
	public numericLiteral(): NumericLiteralContext | undefined {
		return this.tryGetRuleContext(0, NumericLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classMethodEnd; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassMethodEnd) {
			listener.enterClassMethodEnd(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassMethodEnd) {
			listener.exitClassMethodEnd(this);
		}
	}
}


export class ClassMethodResultModifierContext extends ParserRuleContext {
	public CONST(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CONST, 0); }
	public OVERRIDE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.OVERRIDE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classMethodResultModifier; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassMethodResultModifier) {
			listener.enterClassMethodResultModifier(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassMethodResultModifier) {
			listener.exitClassMethodResultModifier(this);
		}
	}
}


export class ClassInitializerListContext extends ParserRuleContext {
	public classInitializer(): ClassInitializerContext {
		return this.getRuleContext(0, ClassInitializerContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COMMA, 0); }
	public classInitializerList(): ClassInitializerListContext | undefined {
		return this.tryGetRuleContext(0, ClassInitializerListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classInitializerList; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassInitializerList) {
			listener.enterClassInitializerList(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassInitializerList) {
			listener.exitClassInitializerList(this);
		}
	}
}


export class ClassInitializerContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public contentWithNestedParens(): ContentWithNestedParensContext {
		return this.getRuleContext(0, ContentWithNestedParensContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classInitializer; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassInitializer) {
			listener.enterClassInitializer(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassInitializer) {
			listener.exitClassInitializer(this);
		}
	}
}


export class ClassPropertyContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	public upropertyMacro(): UpropertyMacroContext | undefined {
		return this.tryGetRuleContext(0, UpropertyMacroContext);
	}
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public contentWithNestedSquares(): ContentWithNestedSquaresContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedSquaresContext);
	}
	public classPropertyDefaultValue(): ClassPropertyDefaultValueContext | undefined {
		return this.tryGetRuleContext(0, ClassPropertyDefaultValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classProperty; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassProperty) {
			listener.enterClassProperty(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassProperty) {
			listener.exitClassProperty(this);
		}
	}
}


export class ClassPropertyDefaultValueContext extends ParserRuleContext {
	public COLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COLON, 0); }
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public EQUALS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.EQUALS, 0); }
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public contentWithNestedParens(): ContentWithNestedParensContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedParensContext);
	}
	public contentWithNestedBraces(): ContentWithNestedBracesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedBracesContext);
	}
	public literalExpression(): LiteralExpressionContext | undefined {
		return this.tryGetRuleContext(0, LiteralExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classPropertyDefaultValue; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassPropertyDefaultValue) {
			listener.enterClassPropertyDefaultValue(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassPropertyDefaultValue) {
			listener.exitClassPropertyDefaultValue(this);
		}
	}
}


export class LiteralExpressionContext extends ParserRuleContext {
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public literalExpression(): LiteralExpressionContext[];
	public literalExpression(i: number): LiteralExpressionContext;
	public literalExpression(i?: number): LiteralExpressionContext | LiteralExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(LiteralExpressionContext);
		} else {
			return this.getRuleContext(i, LiteralExpressionContext);
		}
	}
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.MINUS, 0); }
	public STAR(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.STAR, 0); }
	public BACKSLASH(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.BACKSLASH, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_literalExpression; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterLiteralExpression) {
			listener.enterLiteralExpression(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitLiteralExpression) {
			listener.exitLiteralExpression(this);
		}
	}
}


export class ClassPropertyArraySizeContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public numericLiteral(): NumericLiteralContext | undefined {
		return this.tryGetRuleContext(0, NumericLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_classPropertyArraySize; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterClassPropertyArraySize) {
			listener.enterClassPropertyArraySize(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitClassPropertyArraySize) {
			listener.exitClassPropertyArraySize(this);
		}
	}
}


export class NestedEnumContext extends ParserRuleContext {
	public ENUM(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.ENUM, 0); }
	public contentWithNestedBraces(): ContentWithNestedBracesContext {
		return this.getRuleContext(0, ContentWithNestedBracesContext);
	}
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_nestedEnum; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterNestedEnum) {
			listener.enterNestedEnum(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitNestedEnum) {
			listener.exitNestedEnum(this);
		}
	}
}


export class NestedEnumInheritanceContext extends ParserRuleContext {
	public COLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.COLON, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_nestedEnumInheritance; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterNestedEnumInheritance) {
			listener.enterNestedEnumInheritance(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitNestedEnumInheritance) {
			listener.exitNestedEnumInheritance(this);
		}
	}
}


export class NestedEnumClassContext extends ParserRuleContext {
	public ENUM(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.ENUM, 0); }
	public CLASS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLASS, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public contentWithNestedBraces(): ContentWithNestedBracesContext {
		return this.getRuleContext(0, ContentWithNestedBracesContext);
	}
	public nestedEnumInheritance(): NestedEnumInheritanceContext | undefined {
		return this.tryGetRuleContext(0, NestedEnumInheritanceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_nestedEnumClass; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterNestedEnumClass) {
			listener.enterNestedEnumClass(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitNestedEnumClass) {
			listener.exitNestedEnumClass(this);
		}
	}
}


export class NestedClassContext extends ParserRuleContext {
	public CLASS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLASS, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public contentWithNestedBraces(): ContentWithNestedBracesContext {
		return this.getRuleContext(0, ContentWithNestedBracesContext);
	}
	public classInheritance(): ClassInheritanceContext | undefined {
		return this.tryGetRuleContext(0, ClassInheritanceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_nestedClass; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterNestedClass) {
			listener.enterNestedClass(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitNestedClass) {
			listener.exitNestedClass(this);
		}
	}
}


export class NestedStructContext extends ParserRuleContext {
	public STRUCT(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.STRUCT, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public contentWithNestedBraces(): ContentWithNestedBracesContext {
		return this.getRuleContext(0, ContentWithNestedBracesContext);
	}
	public classInheritance(): ClassInheritanceContext | undefined {
		return this.tryGetRuleContext(0, ClassInheritanceContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_nestedStruct; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterNestedStruct) {
			listener.enterNestedStruct(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitNestedStruct) {
			listener.exitNestedStruct(this);
		}
	}
}


export class GenericEnumDeclarationContext extends ParserRuleContext {
	public ENUM(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.ENUM, 0); }
	public OPEN_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_BRACE, 0); }
	public enumBody(): EnumBodyContext {
		return this.getRuleContext(0, EnumBodyContext);
	}
	public CLOSE_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_BRACE, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COMMA, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_genericEnumDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterGenericEnumDeclaration) {
			listener.enterGenericEnumDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitGenericEnumDeclaration) {
			listener.exitGenericEnumDeclaration(this);
		}
	}
}


export class EnumDeclarationContext extends ParserRuleContext {
	public enumHeader(): EnumHeaderContext {
		return this.getRuleContext(0, EnumHeaderContext);
	}
	public OPEN_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_BRACE, 0); }
	public enumBody(): EnumBodyContext {
		return this.getRuleContext(0, EnumBodyContext);
	}
	public CLOSE_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_BRACE, 0); }
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COMMA, 0); }
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_enumDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterEnumDeclaration) {
			listener.enterEnumDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitEnumDeclaration) {
			listener.exitEnumDeclaration(this);
		}
	}
}


export class EnumHeaderContext extends ParserRuleContext {
	public ENUM(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.ENUM, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public uenumMacro(): UenumMacroContext | undefined {
		return this.tryGetRuleContext(0, UenumMacroContext);
	}
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CLASS, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COLON, 0); }
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_enumHeader; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterEnumHeader) {
			listener.enterEnumHeader(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitEnumHeader) {
			listener.exitEnumHeader(this);
		}
	}
}


export class EnumBodyContext extends ParserRuleContext {
	public enumEntry(): EnumEntryContext {
		return this.getRuleContext(0, EnumEntryContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COMMA, 0); }
	public enumBody(): EnumBodyContext | undefined {
		return this.tryGetRuleContext(0, EnumBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_enumBody; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterEnumBody) {
			listener.enterEnumBody(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitEnumBody) {
			listener.exitEnumBody(this);
		}
	}
}


export class EnumEntryContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public enumValue(): EnumValueContext | undefined {
		return this.tryGetRuleContext(0, EnumValueContext);
	}
	public umetaMacro(): UmetaMacroContext | undefined {
		return this.tryGetRuleContext(0, UmetaMacroContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_enumEntry; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterEnumEntry) {
			listener.enterEnumEntry(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitEnumEntry) {
			listener.exitEnumEntry(this);
		}
	}
}


export class EnumValueContext extends ParserRuleContext {
	public EQUALS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.EQUALS, 0); }
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_enumValue; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterEnumValue) {
			listener.enterEnumValue(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitEnumValue) {
			listener.exitEnumValue(this);
		}
	}
}


export class StaticFunctionDeclarationContext extends ParserRuleContext {
	public functionName(): FunctionNameContext {
		return this.getRuleContext(0, FunctionNameContext);
	}
	public contentWithNestedParens(): ContentWithNestedParensContext {
		return this.getRuleContext(0, ContentWithNestedParensContext);
	}
	public functionModifier(): FunctionModifierContext[];
	public functionModifier(i: number): FunctionModifierContext;
	public functionModifier(i?: number): FunctionModifierContext | FunctionModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FunctionModifierContext);
		} else {
			return this.getRuleContext(i, FunctionModifierContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public CONST(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CONST, 0); }
	public contentWithNestedBraces(): ContentWithNestedBracesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedBracesContext);
	}
	public SEMICOLON(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_staticFunctionDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterStaticFunctionDeclaration) {
			listener.enterStaticFunctionDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitStaticFunctionDeclaration) {
			listener.exitStaticFunctionDeclaration(this);
		}
	}
}


export class StaticArrayDeclarationContext extends ParserRuleContext {
	public functionName(): FunctionNameContext {
		return this.getRuleContext(0, FunctionNameContext);
	}
	public EQUALS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.EQUALS, 0); }
	public contentWithNestedBraces(): ContentWithNestedBracesContext {
		return this.getRuleContext(0, ContentWithNestedBracesContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	public functionModifier(): FunctionModifierContext[];
	public functionModifier(i: number): FunctionModifierContext;
	public functionModifier(i?: number): FunctionModifierContext | FunctionModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FunctionModifierContext);
		} else {
			return this.getRuleContext(i, FunctionModifierContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_staticArrayDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterStaticArrayDeclaration) {
			listener.enterStaticArrayDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitStaticArrayDeclaration) {
			listener.exitStaticArrayDeclaration(this);
		}
	}
}


export class StaticPropertyDeclarationContext extends ParserRuleContext {
	public STATIC(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.STATIC, 0); }
	public typeDeclaration(): TypeDeclarationContext {
		return this.getRuleContext(0, TypeDeclarationContext);
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public EQUALS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.EQUALS, 0); }
	public literal(): LiteralContext {
		return this.getRuleContext(0, LiteralContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_staticPropertyDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterStaticPropertyDeclaration) {
			listener.enterStaticPropertyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitStaticPropertyDeclaration) {
			listener.exitStaticPropertyDeclaration(this);
		}
	}
}


export class StaticInlineFunctionDeclarationContext extends ParserRuleContext {
	public FORCEINLINE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.FORCEINLINE, 0); }
	public typeDeclaration(): TypeDeclarationContext {
		return this.getRuleContext(0, TypeDeclarationContext);
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public contentWithNestedParens(): ContentWithNestedParensContext {
		return this.getRuleContext(0, ContentWithNestedParensContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_staticInlineFunctionDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterStaticInlineFunctionDeclaration) {
			listener.enterStaticInlineFunctionDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitStaticInlineFunctionDeclaration) {
			listener.exitStaticInlineFunctionDeclaration(this);
		}
	}
}


export class StaticMethodCallContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public contentWithNestedParens(): ContentWithNestedParensContext {
		return this.getRuleContext(0, ContentWithNestedParensContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_staticMethodCall; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterStaticMethodCall) {
			listener.enterStaticMethodCall(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitStaticMethodCall) {
			listener.exitStaticMethodCall(this);
		}
	}
}


export class TypedefContext extends ParserRuleContext {
	public TYPEDEF(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.TYPEDEF, 0); }
	public typeDeclaration(): TypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, TypeDeclarationContext);
	}
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public SEMICOLON(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SEMICOLON, 0); }
	public TYPENAME(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.TYPENAME, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CLASS, 0); }
	public STRUCT(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.STRUCT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_typedef; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterTypedef) {
			listener.enterTypedef(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitTypedef) {
			listener.exitTypedef(this);
		}
	}
}


export class ContentWithNestedParensContext extends ParserRuleContext {
	public OPEN_PAREN(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_PAREN, 0); }
	public CLOSE_PAREN(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_PAREN, 0); }
	public contentWithNestedParensInner(): ContentWithNestedParensInnerContext[];
	public contentWithNestedParensInner(i: number): ContentWithNestedParensInnerContext;
	public contentWithNestedParensInner(i?: number): ContentWithNestedParensInnerContext | ContentWithNestedParensInnerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ContentWithNestedParensInnerContext);
		} else {
			return this.getRuleContext(i, ContentWithNestedParensInnerContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedParens; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedParens) {
			listener.enterContentWithNestedParens(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedParens) {
			listener.exitContentWithNestedParens(this);
		}
	}
}


export class ContentWithNestedParensInnerContext extends ParserRuleContext {
	public OPEN_PAREN(): TerminalNode[];
	public OPEN_PAREN(i: number): TerminalNode;
	public OPEN_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.OPEN_PAREN);
		} else {
			return this.getToken(SatisfactoryHeaderParser.OPEN_PAREN, i);
		}
	}
	public CLOSE_PAREN(): TerminalNode[];
	public CLOSE_PAREN(i: number): TerminalNode;
	public CLOSE_PAREN(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.CLOSE_PAREN);
		} else {
			return this.getToken(SatisfactoryHeaderParser.CLOSE_PAREN, i);
		}
	}
	public contentWithNestedParens(): ContentWithNestedParensContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedParensContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedParensInner; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedParensInner) {
			listener.enterContentWithNestedParensInner(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedParensInner) {
			listener.exitContentWithNestedParensInner(this);
		}
	}
}


export class ContentWithNestedBracesContext extends ParserRuleContext {
	public OPEN_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_BRACE, 0); }
	public CLOSE_BRACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_BRACE, 0); }
	public contentWithNestedBracesInner(): ContentWithNestedBracesInnerContext[];
	public contentWithNestedBracesInner(i: number): ContentWithNestedBracesInnerContext;
	public contentWithNestedBracesInner(i?: number): ContentWithNestedBracesInnerContext | ContentWithNestedBracesInnerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ContentWithNestedBracesInnerContext);
		} else {
			return this.getRuleContext(i, ContentWithNestedBracesInnerContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedBraces; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedBraces) {
			listener.enterContentWithNestedBraces(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedBraces) {
			listener.exitContentWithNestedBraces(this);
		}
	}
}


export class ContentWithNestedBracesInnerContext extends ParserRuleContext {
	public OPEN_BRACE(): TerminalNode[];
	public OPEN_BRACE(i: number): TerminalNode;
	public OPEN_BRACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.OPEN_BRACE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.OPEN_BRACE, i);
		}
	}
	public CLOSE_BRACE(): TerminalNode[];
	public CLOSE_BRACE(i: number): TerminalNode;
	public CLOSE_BRACE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.CLOSE_BRACE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.CLOSE_BRACE, i);
		}
	}
	public contentWithNestedBraces(): ContentWithNestedBracesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedBracesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedBracesInner; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedBracesInner) {
			listener.enterContentWithNestedBracesInner(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedBracesInner) {
			listener.exitContentWithNestedBracesInner(this);
		}
	}
}


export class ContentWithNestedAnglesContext extends ParserRuleContext {
	public OPEN_ANGLE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_ANGLE, 0); }
	public CLOSE_ANGLE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_ANGLE, 0); }
	public contentWithNestedAnglesInner(): ContentWithNestedAnglesInnerContext[];
	public contentWithNestedAnglesInner(i: number): ContentWithNestedAnglesInnerContext;
	public contentWithNestedAnglesInner(i?: number): ContentWithNestedAnglesInnerContext | ContentWithNestedAnglesInnerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ContentWithNestedAnglesInnerContext);
		} else {
			return this.getRuleContext(i, ContentWithNestedAnglesInnerContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedAngles; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedAngles) {
			listener.enterContentWithNestedAngles(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedAngles) {
			listener.exitContentWithNestedAngles(this);
		}
	}
}


export class ContentWithNestedAnglesInnerContext extends ParserRuleContext {
	public OPEN_ANGLE(): TerminalNode[];
	public OPEN_ANGLE(i: number): TerminalNode;
	public OPEN_ANGLE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.OPEN_ANGLE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.OPEN_ANGLE, i);
		}
	}
	public CLOSE_ANGLE(): TerminalNode[];
	public CLOSE_ANGLE(i: number): TerminalNode;
	public CLOSE_ANGLE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.CLOSE_ANGLE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.CLOSE_ANGLE, i);
		}
	}
	public contentWithNestedAngles(): ContentWithNestedAnglesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedAnglesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedAnglesInner; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedAnglesInner) {
			listener.enterContentWithNestedAnglesInner(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedAnglesInner) {
			listener.exitContentWithNestedAnglesInner(this);
		}
	}
}


export class ContentWithNestedSquaresContext extends ParserRuleContext {
	public OPEN_SQUARE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_SQUARE, 0); }
	public CLOSE_SQUARE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_SQUARE, 0); }
	public contentWithNestedSquaresInner(): ContentWithNestedSquaresInnerContext[];
	public contentWithNestedSquaresInner(i: number): ContentWithNestedSquaresInnerContext;
	public contentWithNestedSquaresInner(i?: number): ContentWithNestedSquaresInnerContext | ContentWithNestedSquaresInnerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ContentWithNestedSquaresInnerContext);
		} else {
			return this.getRuleContext(i, ContentWithNestedSquaresInnerContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedSquares; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedSquares) {
			listener.enterContentWithNestedSquares(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedSquares) {
			listener.exitContentWithNestedSquares(this);
		}
	}
}


export class ContentWithNestedSquaresInnerContext extends ParserRuleContext {
	public OPEN_SQUARE(): TerminalNode[];
	public OPEN_SQUARE(i: number): TerminalNode;
	public OPEN_SQUARE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.OPEN_SQUARE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.OPEN_SQUARE, i);
		}
	}
	public CLOSE_SQUARE(): TerminalNode[];
	public CLOSE_SQUARE(i: number): TerminalNode;
	public CLOSE_SQUARE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.CLOSE_SQUARE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.CLOSE_SQUARE, i);
		}
	}
	public contentWithNestedSquares(): ContentWithNestedSquaresContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedSquaresContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_contentWithNestedSquaresInner; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterContentWithNestedSquaresInner) {
			listener.enterContentWithNestedSquaresInner(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitContentWithNestedSquaresInner) {
			listener.exitContentWithNestedSquaresInner(this);
		}
	}
}


export class FunctionNameContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.TILDE, 0); }
	public OPERATOR(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.OPERATOR, 0); }
	public EQUALS(): TerminalNode[];
	public EQUALS(i: number): TerminalNode;
	public EQUALS(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.EQUALS);
		} else {
			return this.getToken(SatisfactoryHeaderParser.EQUALS, i);
		}
	}
	public BANG(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.BANG, 0); }
	public PLUS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.PLUS, 0); }
	public MINUS(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.MINUS, 0); }
	public OPEN_SQUARE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.OPEN_SQUARE, 0); }
	public CLOSE_SQUARE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CLOSE_SQUARE, 0); }
	public OPEN_ANGLE(): TerminalNode[];
	public OPEN_ANGLE(i: number): TerminalNode;
	public OPEN_ANGLE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.OPEN_ANGLE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.OPEN_ANGLE, i);
		}
	}
	public CLOSE_ANGLE(): TerminalNode[];
	public CLOSE_ANGLE(i: number): TerminalNode;
	public CLOSE_ANGLE(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(SatisfactoryHeaderParser.CLOSE_ANGLE);
		} else {
			return this.getToken(SatisfactoryHeaderParser.CLOSE_ANGLE, i);
		}
	}
	public OPEN_PAREN(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.OPEN_PAREN, 0); }
	public CLOSE_PAREN(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CLOSE_PAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_functionName; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterFunctionName) {
			listener.enterFunctionName(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitFunctionName) {
			listener.exitFunctionName(this);
		}
	}
}


export class FunctionModifierContext extends ParserRuleContext {
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.STATIC, 0); }
	public CONST(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CONST, 0); }
	public CONSTEXPR(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.CONSTEXPR, 0); }
	public VIRTUAL(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.VIRTUAL, 0); }
	public FORCEINLINE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.FORCEINLINE, 0); }
	public INLINE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.INLINE, 0); }
	public FRIEND(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.FRIEND, 0); }
	public TEMPLATE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.TEMPLATE, 0); }
	public contentWithNestedAngles(): ContentWithNestedAnglesContext | undefined {
		return this.tryGetRuleContext(0, ContentWithNestedAnglesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_functionModifier; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterFunctionModifier) {
			listener.enterFunctionModifier(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitFunctionModifier) {
			listener.exitFunctionModifier(this);
		}
	}
}


export class NamespaceDeclarationContext extends ParserRuleContext {
	public NAMESPACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.NAMESPACE, 0); }
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public contentWithNestedBraces(): ContentWithNestedBracesContext {
		return this.getRuleContext(0, ContentWithNestedBracesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_namespaceDeclaration; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterNamespaceDeclaration) {
			listener.enterNamespaceDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitNamespaceDeclaration) {
			listener.exitNamespaceDeclaration(this);
		}
	}
}


export class UsingNamespaceContext extends ParserRuleContext {
	public USING(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.USING, 0); }
	public identifier(): IdentifierContext[];
	public identifier(i: number): IdentifierContext;
	public identifier(i?: number): IdentifierContext | IdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(IdentifierContext);
		} else {
			return this.getRuleContext(i, IdentifierContext);
		}
	}
	public EQUALS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.EQUALS, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_usingNamespace; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUsingNamespace) {
			listener.enterUsingNamespace(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUsingNamespace) {
			listener.exitUsingNamespace(this);
		}
	}
}


export class UclassMacroContext extends ParserRuleContext {
	public UCLASS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UCLASS, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_uclassMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUclassMacro) {
			listener.enterUclassMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUclassMacro) {
			listener.exitUclassMacro(this);
		}
	}
}


export class UenumMacroContext extends ParserRuleContext {
	public UENUM(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UENUM, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_uenumMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUenumMacro) {
			listener.enterUenumMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUenumMacro) {
			listener.exitUenumMacro(this);
		}
	}
}


export class UfunctionMacroContext extends ParserRuleContext {
	public UFUNCTION(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UFUNCTION, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	public FORCEINLINE(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.FORCEINLINE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_ufunctionMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUfunctionMacro) {
			listener.enterUfunctionMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUfunctionMacro) {
			listener.exitUfunctionMacro(this);
		}
	}
}


export class UinterfaceMacroContext extends ParserRuleContext {
	public UINTERFACE(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UINTERFACE, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_uinterfaceMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUinterfaceMacro) {
			listener.enterUinterfaceMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUinterfaceMacro) {
			listener.exitUinterfaceMacro(this);
		}
	}
}


export class UmetaMacroContext extends ParserRuleContext {
	public UMETA(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UMETA, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_umetaMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUmetaMacro) {
			listener.enterUmetaMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUmetaMacro) {
			listener.exitUmetaMacro(this);
		}
	}
}


export class UParamMacroContext extends ParserRuleContext {
	public UPARAM(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UPARAM, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_uParamMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUParamMacro) {
			listener.enterUParamMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUParamMacro) {
			listener.exitUParamMacro(this);
		}
	}
}


export class UpropertyMacroContext extends ParserRuleContext {
	public UPROPERTY(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UPROPERTY, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_upropertyMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUpropertyMacro) {
			listener.enterUpropertyMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUpropertyMacro) {
			listener.exitUpropertyMacro(this);
		}
	}
}


export class UstructMacroContext extends ParserRuleContext {
	public USTRUCT(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.USTRUCT, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_ustructMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUstructMacro) {
			listener.enterUstructMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUstructMacro) {
			listener.exitUstructMacro(this);
		}
	}
}


export class UedeprecatedMacroContext extends ParserRuleContext {
	public UE_DEPRECATED(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.UE_DEPRECATED, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_uedeprecatedMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterUedeprecatedMacro) {
			listener.enterUedeprecatedMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitUedeprecatedMacro) {
			listener.exitUedeprecatedMacro(this);
		}
	}
}


export class GeneratedBodyMacroContext extends ParserRuleContext {
	public SF_GENERATED_BODY(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.SF_GENERATED_BODY, 0); }
	public macroPropertyList(): MacroPropertyListContext {
		return this.getRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_generatedBodyMacro; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterGeneratedBodyMacro) {
			listener.enterGeneratedBodyMacro(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitGeneratedBodyMacro) {
			listener.exitGeneratedBodyMacro(this);
		}
	}
}


export class MacroPropertyListContext extends ParserRuleContext {
	public OPEN_PAREN(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.OPEN_PAREN, 0); }
	public CLOSE_PAREN(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.CLOSE_PAREN, 0); }
	public macroPropertyListEntries(): MacroPropertyListEntriesContext | undefined {
		return this.tryGetRuleContext(0, MacroPropertyListEntriesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_macroPropertyList; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterMacroPropertyList) {
			listener.enterMacroPropertyList(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitMacroPropertyList) {
			listener.exitMacroPropertyList(this);
		}
	}
}


export class MacroPropertyListEntriesContext extends ParserRuleContext {
	public macroProperty(): MacroPropertyContext {
		return this.getRuleContext(0, MacroPropertyContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(SatisfactoryHeaderParser.COMMA, 0); }
	public macroPropertyListEntries(): MacroPropertyListEntriesContext | undefined {
		return this.tryGetRuleContext(0, MacroPropertyListEntriesContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_macroPropertyListEntries; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterMacroPropertyListEntries) {
			listener.enterMacroPropertyListEntries(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitMacroPropertyListEntries) {
			listener.exitMacroPropertyListEntries(this);
		}
	}
}


export class MacroPropertyContext extends ParserRuleContext {
	public identifier(): IdentifierContext | undefined {
		return this.tryGetRuleContext(0, IdentifierContext);
	}
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public macroPropertyPair(): MacroPropertyPairContext | undefined {
		return this.tryGetRuleContext(0, MacroPropertyPairContext);
	}
	public macroPropertyList(): MacroPropertyListContext | undefined {
		return this.tryGetRuleContext(0, MacroPropertyListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_macroProperty; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterMacroProperty) {
			listener.enterMacroProperty(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitMacroProperty) {
			listener.exitMacroProperty(this);
		}
	}
}


export class MacroPropertyPairContext extends ParserRuleContext {
	public identifier(): IdentifierContext {
		return this.getRuleContext(0, IdentifierContext);
	}
	public EQUALS(): TerminalNode { return this.getToken(SatisfactoryHeaderParser.EQUALS, 0); }
	public macroProperty(): MacroPropertyContext {
		return this.getRuleContext(0, MacroPropertyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return SatisfactoryHeaderParser.RULE_macroPropertyPair; }
	// @Override
	public enterRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.enterMacroPropertyPair) {
			listener.enterMacroPropertyPair(this);
		}
	}
	// @Override
	public exitRule(listener: SatisfactoryHeaderParserListener): void {
		if (listener.exitMacroPropertyPair) {
			listener.exitMacroPropertyPair(this);
		}
	}
}


