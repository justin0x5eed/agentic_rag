# RAG 演示項目 / RAG Demo Project<br>

## 简体中文<br>
这是一个 RAG 演示项目，支持 RAG 和 Agentic RAG 两种模式，项目基于Django和React框架。<br>
在RAG模式中：有Qwen3、Gemma3、GPT-OSS，3种模型选择，支持Web搜索和知识库上传，Web搜索基于LangChain社区的DuckDuckGoSearchRun，知识库上传支持TXT、DOC、DOCX，3种格式，可上传多个文件。<br>
在Agentic RAG模式中：大模型会根据用户的提示词，判断是否需要调用工具：Web搜索和知识库检索，如果需要调用，大模型会自动生成相应参数，目前两种模式都不支持其他工具调用。<br>
注：Gemma3模型不支持工具调用，所以无法用于Agentic RAG模式。<br>
搭建开发环境，Django后端:<br>
这个项目使用本地部署的 Ollama 提供大模型服务，你可以将 base_url 替换为自己的 Ollama 地址。<br>
git clone https://github.com/justin0x5eed/agentic_rag.git<br>
cd agentic_rag<br>
uv pip -r requirements.txt<br>
由于langchain-redis和langchain_core有版本冲突，需要分开安装：<br>
uv pip install langchain-redis==0.2.4<br>
uv pip install -U langchain_core<br>
前端开发环境使用docker构建，也可以使用自己习惯的方式创建开发环境：<br>
docker创建vite项目：<br>
docker run -it --rm -v $(pwd)/frontend:/app -p 5173:5173 -w /app node:25 bash -c "npm create vite@latest . -- --template react-ts"<br>
安装依赖<br>
docker run -it --rm -v $(pwd)/frontend:/app -w /app node:25 npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest<br>
运行开发环境<br>
docker run -it --rm -v $(pwd)/frontend:/app -p 5173:5173 -w /app node:25 bash -c "npm run dev -- --host 0.0.0.0"<br>
## 繁體中文<br>

這是一個 RAG 演示專案，支援 RAG 和 Agentic RAG 兩種模式，專案基於 Django 和 React 框架。<br>
在 RAG 模式中：提供 Qwen3、Gemma3、GPT-OSS 三種模型選擇，支援 Web 搜尋與知識庫上傳。Web 搜尋基於 LangChain 社群的 DuckDuckGoSearchRun，知識庫上傳支援 TXT、DOC、DOCX 三種格式，可一次上傳多個檔案。<br>
在 Agentic RAG 模式中：大模型會依據使用者提示判斷是否需要呼叫工具（Web 搜尋與知識庫檢索）。如需呼叫，模型會自動生成相關參數；目前兩種模式均不支援其他工具。需注意 Gemma3 模型不支援工具呼叫，因此無法用於 Agentic RAG 模式。<br>
後端（Django）開發環境搭建步驟：<br>
這個專案使用本地部署的 Ollama 作為大型模型服務，你可以將 base_url 替換成你自己的 Ollama 位址。<br>
1. git clone https://github.com/justin0x5eed/agentic_rag.git<br>
2. cd agentic_rag<br>
3. uv pip -r requirements.txt<br>
4. 因 langchain-redis 與 langchain_core 有版本衝突，需分開安裝：<br>
   - uv pip install langchain-redis==0.2.4<br>
   - uv pip install -U langchain_core<br>
前端開發環境可用 Docker 建置，或依照習慣自行建立：<br>
- 使用 Docker 建立 Vite 專案：<br>
  - docker run -it --rm -v $(pwd)/frontend:/app -p 5173:5173 -w /app node:25 bash -c "npm create vite@latest . -- --template react-ts"<br>
- 安裝依賴：<br>
  - docker run -it --rm -v $(pwd)/frontend:/app -w /app node:25 npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest<br>
- 啟動開發環境：<br>
  - docker run -it --rm -v $(pwd)/frontend:/app -p 5173:5173 -w /app node:25 bash -c "npm run dev -- --host 0.0.0.0"<br>

## English<br>
This is a RAG demo project supporting both standard RAG and Agentic RAG modes, built with Django and React.<br>
In RAG mode: choose among three models—Qwen3, Gemma3, and GPT-OSS. The mode supports web search and knowledge-base uploads. Web search uses LangChain Community's DuckDuckGoSearchRun, and the knowledge base accepts TXT, DOC, and DOCX uploads with multi-file support.<br>
In Agentic RAG mode: the LLM decides, based on user prompts, whether to call tools (web search or knowledge-base retrieval). When tool use is needed, the LLM auto-generates the parameters. No other tools are supported in either mode. Note that Gemma3 cannot perform tool calls, so it is unavailable for Agentic RAG mode.<br>
Backend (Django) development setup:<br>
This project uses a locally deployed Ollama instance to provide large-model services. You can replace the base_url with your own Ollama server address.<br>
1. git clone https://github.com/justin0x5eed/agentic_rag.git<br>
2. cd agentic_rag<br>
3. uv pip -r requirements.txt<br>
4. Because langchain-redis and langchain_core have version conflicts, install them separately:<br>
   - uv pip install langchain-redis==0.2.4<br>
   - uv pip install -U langchain_core<br>
Frontend development environment can be created with Docker or your preferred approach:<br>
- Create a Vite project with Docker:<br>
  - docker run -it --rm -v $(pwd)/frontend:/app -p 5173:5173 -w /app node:25 bash -c "npm create vite@latest . -- --template react-ts"<br>
- Install dependencies:<br>
  - docker run -it --rm -v $(pwd)/frontend:/app -w /app node:25 npm install tailwindcss@latest @tailwindcss/vite@latest daisyui@latest<br>
- Run the development server:<br>
  - docker run -it --rm -v $(pwd)/frontend:/app -p 5173:5173 -w /app node:25 bash -c "npm run dev -- --host 0.0.0.0"<br>
