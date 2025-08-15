import plotly.graph_objects as go
import plotly.express as px

# Data for the AI Mental Wellness Platform Architecture
layers = [
    {"name": "User Interface", "items": ["Mobile App", "Web Portal", "WhatsApp Bot", "Voice UI"], "y": 6},
    {"name": "AI Services", "items": ["Vertex AI", "Gemini Models", "MedLM", "NLP", "Sentiment AI", "Crisis AI"], "y": 5},
    {"name": "Core Application", "items": ["Chatbot", "Mood Track", "Culture Lib", "Multilingual", "Peer Support", "Family Features"], "y": 4},
    {"name": "Security & Privacy", "items": ["Encryption", "Privacy Ctrl", "Consent Mgmt", "Data Anon", "Auth"], "y": 3},
    {"name": "Data Storage", "items": ["User Profiles", "Chat History", "Assessments", "Culture Data", "Analytics"], "y": 2},
    {"name": "Integrations", "items": ["Tele-MANAS", "Mental Health", "Education", "Healthcare", "NGOs"], "y": 1},
    {"name": "Analytics", "items": ["Usage Track", "Effectiveness", "Safety Mon", "Culture Met", "Outcomes"], "y": 0}
]

# Brand colors
colors = ["#1FB8CD", "#DB4545", "#2E8B57", "#5D878F", "#D2BA4C", "#B4413C", "#964325"]

fig = go.Figure()

# Add layer boxes and components
for i, layer in enumerate(layers):
    color = colors[i % len(colors)]
    
    # Add main layer box
    fig.add_shape(
        type="rect",
        x0=-0.5, y0=layer["y"]-0.4,
        x1=len(layer["items"])+0.5, y1=layer["y"]+0.4,
        line=dict(color=color, width=3),
        fillcolor=color,
        opacity=0.2
    )
    
    # Add layer title
    fig.add_annotation(
        x=-0.3, y=layer["y"],
        text=f"<b>{layer['name']}</b>",
        showarrow=False,
        font=dict(size=14, color=color),
        xanchor="right"
    )
    
    # Add component boxes
    for j, item in enumerate(layer["items"]):
        fig.add_shape(
            type="rect",
            x0=j+0.1, y0=layer["y"]-0.3,
            x1=j+0.9, y1=layer["y"]+0.3,
            line=dict(color=color, width=2),
            fillcolor="white",
            opacity=0.9
        )
        
        # Add component text
        fig.add_annotation(
            x=j+0.5, y=layer["y"],
            text=item,
            showarrow=False,
            font=dict(size=10),
            xanchor="center"
        )

# Add data flow arrows between layers
arrows = [
    (6, 5, "User Requests"),
    (5, 4, "AI Processing"),
    (4, 3, "Security Check"),
    (4, 2, "Data Storage"),
    (2, 1, "External APIs"),
    (2, 0, "Analytics"),
    (0, 4, "Insights")
]

for start_y, end_y, label in arrows:
    fig.add_annotation(
        x=3, y=(start_y + end_y) / 2,
        ax=3, ay=start_y - 0.4,
        axref="x", ayref="y",
        xref="x", yref="y",
        arrowhead=2,
        arrowsize=1,
        arrowwidth=2,
        arrowcolor="#666666",
        opacity=0.7
    )

# Configure layout
fig.update_layout(
    title="AI Mental Wellness Platform Arch",
    xaxis=dict(
        range=[-1, 7],
        showgrid=False,
        showticklabels=False,
        zeroline=False
    ),
    yaxis=dict(
        range=[-0.8, 6.8],
        showgrid=False,
        showticklabels=False,
        zeroline=False
    ),
    showlegend=False,
    plot_bgcolor="white",
    height=800
)

# Save the chart
fig.write_image("mental_wellness_architecture.png", width=1200, height=800)