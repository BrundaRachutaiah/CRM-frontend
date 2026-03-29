# Anvaya CRM — Frontend

A full-stack CRM (Customer Relationship Management) app where you can manage leads, track sales agents, add comments, and view analytics reports.
Built with a **React** frontend (Vite), connected to an **Express/Node** backend with **MongoDB** — deployed on **Vercel**.

---

## 🔗 Demo Link

**Live Demo:** https://www.loom.com/share/ea582907f2924a11b18eb737c49fd826

---

## ⚡ Quick Start

```bash
git clone https://github.com/BrundaRachutaiah/CRM-frontend.git
cd CRM-frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173` by default.

Create a `.env` file in the root:

```env
VITE_API_BASE_URL= https://crm-frontend-ashy-two.vercel.app/
```

---

## 🛠️ Technologies

| Layer      | Tech                              |
|------------|-----------------------------------|
| Frontend   | React 19, React Router DOM v7     |
| Bundler    | Vite 7                            |
| HTTP Client| Axios                             |
| Charts     | Chart.js 4, react-chartjs-2       |
| Deployment | Vercel                            |
| Backend    | Node.js, Express, MongoDB         |

---

## ✨ Features

### 🏠 Dashboard
- Overview stats: **Total Leads**, **In Pipeline**, and **Closed** counts
- Quick filters by **Status**, **Sales Agent**, and **Priority** (client-side)
- Full leads list with live filtering and one-click view

### 📋 Leads
- Paginated leads list with **status** and **agent** filters
- Filter results shown with toast notification count
- **Add New Lead** form with fields: name, source, agent, status, priority, time to close, tags (multi-select)
- **Edit Lead** form — pre-populated with existing data, patch on save
- **Lead Details** page — full info, status/priority badges, and comment thread

### 💬 Comments
- Add comments to any lead with agent attribution
- Comments displayed newest first with author name and timestamp

### 👤 Sales Agents
- View all agents with name and email
- **Add New Agent** form with duplicate email validation
- Delete agents via Settings page (with confirmation dialog)

### 📊 Reports
- **Pipeline Report** — total leads currently in pipeline with Pie Chart (In Pipeline vs Closed)
- **Closed Last 7 Days** — leads closed within the past week
- **Closed by Agent** — Bar Chart + table showing closed lead counts per agent
- **Leads by Status** — filterable list by status and agent, sortable by time to close
- **Leads by Agent** — filterable by agent, status, and priority, sortable by time to close

### ⚙️ Settings
- Delete leads and sales agents from a single management page
- Confirmation dialog before any destructive action

---

## 📁 Project Structure

```
CRM-frontend-main/
├── public/
├── src/
│   ├── api/
│   │   ├── api.js                    # Axios instance with base URL + auth header
│   │   ├── leads.api.js              # Lead CRUD functions
│   │   ├── agents.api.js             # Agent CRUD functions
│   │   ├── comment.api.js            # Comment fetch/create
│   │   ├── reports.api.js            # Report fetch functions
│   │   └── tag.api.js                # Tag fetch/create
│   ├── components/
│   │   ├── AlertProvider.jsx         # Toast notification context + stack
│   │   ├── Card.jsx                  # Reusable card container
│   │   ├── ClosedByAgentBarChart.jsx # Bar chart — closed leads per agent
│   │   ├── CommentSection.jsx        # Comment list + add comment form
│   │   ├── Filters.jsx               # Status + agent filter bar
│   │   ├── LeadCard.jsx              # Compact lead card
│   │   ├── LeadForm.jsx              # Basic lead creation form
│   │   ├── LeadList.jsx              # Lead rows with View link
│   │   ├── PipelinePieChart.jsx      # Pie chart — pipeline vs closed
│   │   └── StatCard.jsx              # Stat display tile
│   ├── hooks/
│   │   └── useAlert.js               # Hook to access alert context
│   ├── layout/
│   │   ├── DashboardLayout.jsx       # Sidebar + main shell wrapper
│   │   └── Sidebar.jsx               # Nav links (Anvaya CRM)
│   ├── pages/
│   │   ├── Dashboard.jsx             # Stats + filtered leads list
│   │   ├── Leads.jsx                 # All leads + filter bar
│   │   ├── AddLead.jsx               # Create new lead form
│   │   ├── EditLead.jsx              # Edit existing lead form
│   │   ├── LeadDetails.jsx           # Full lead view + comments
│   │   ├── Agents.jsx                # All agents list
│   │   ├── AddAgent.jsx              # Add new agent form
│   │   ├── Reports.jsx               # Analytics overview page
│   │   ├── LeadsByStatus.jsx         # Leads filtered/sorted by status
│   │   ├── LeadsByAgent.jsx          # Leads filtered/sorted by agent
│   │   └── Settings.jsx              # Delete leads & agents
│   ├── styles/                       # Per-feature CSS modules
│   ├── App.jsx                       # Routes definition
│   └── main.jsx                      # App entry point
├── index.html
├── vite.config.js
├── vercel.json
└── package.json
```

---

## 🗺️ Routes

| Path                  | Page              | Description                          |
|-----------------------|-------------------|--------------------------------------|
| `/`                   | Dashboard         | Stats overview + filtered leads      |
| `/leads`              | Leads             | All leads with filter bar            |
| `/leads/new`          | AddLead           | Create a new lead                    |
| `/leads/:id`          | LeadDetails       | Full lead info + comments            |
| `/leads/:id/edit`     | EditLead          | Edit lead details                    |
| `/agents`             | Agents            | All sales agents list                |
| `/agents/new`         | AddAgent          | Add a new sales agent                |
| `/reports`            | Reports           | Analytics with charts                |
| `/reports/status`     | LeadsByStatus     | Leads grouped/filtered by status     |
| `/reports/agent`      | LeadsByAgent      | Leads grouped/filtered by agent      |
| `/settings`           | Settings          | Delete leads and agents              |

---

## 🌐 API Reference

Base URL configured via `VITE_API_BASE_URL` in `.env`.
All requests include an `x-agent-id` header (set via Axios interceptor).

### Leads
| Method   | Endpoint              | Description                         |
|----------|-----------------------|-------------------------------------|
| `GET`    | `/leads`              | Fetch all leads (supports `?status=`, `?salesAgent=`, `?tags=`) |
| `GET`    | `/leads/:id`          | Fetch single lead                   |
| `POST`   | `/leads`              | Create a new lead                   |
| `PATCH`  | `/leads/:id`          | Update a lead                       |
| `DELETE` | `/leads/:id`          | Delete a lead                       |

### Agents
| Method   | Endpoint              | Description                         |
|----------|-----------------------|-------------------------------------|
| `GET`    | `/agents`             | Fetch all sales agents              |
| `POST`   | `/agents`             | Create a new agent                  |
| `DELETE` | `/agents/:id`         | Delete an agent                     |

### Comments
| Method   | Endpoint                    | Description                   |
|----------|-----------------------------|-------------------------------|
| `GET`    | `/leads/:id/comments`       | Fetch all comments for a lead |
| `POST`   | `/leads/:id/comments`       | Add a comment to a lead       |

### Tags
| Method   | Endpoint    | Description         |
|----------|-------------|---------------------|
| `GET`    | `/tags`     | Fetch all tags      |
| `POST`   | `/tags`     | Create a new tag    |

### Reports
| Method | Endpoint                    | Description                              |
|--------|-----------------------------|------------------------------------------|
| `GET`  | `/report/pipeline`          | Total leads currently in pipeline        |
| `GET`  | `/report/last-week`         | Leads closed in the last 7 days          |
| `GET`  | `/report/closed-by-agent`   | Closed lead counts grouped by agent      |

---

## 🚀 Available Scripts

| Script            | Description                        |
|-------------------|------------------------------------|
| `npm run dev`     | Start development server (Vite)    |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview production build           |
| `npm run lint`    | Run ESLint                         |

---

## 🚀 Deployment (Vercel)

The project is configured for Vercel via `vercel.json` using the Vite framework preset with SPA rewrites.

```bash
npm install -g vercel
vercel
```

Add `VITE_API_BASE_URL` as an **Environment Variable** in your Vercel project settings.

---

## 📹 Demo Video

Watch a full walkthrough of all major features: [Loom Video Link](#)

---

## 📬 Contact

For bugs or feature requests, please open an issue or reach out at: `your-email@example.com`
